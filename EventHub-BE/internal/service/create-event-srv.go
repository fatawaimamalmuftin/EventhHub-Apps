package service

import (
	"context"
	"encoding/base64"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

type CreateEventSrv struct {
	CEr *repo.DbCreateEventRepo
	Db  *pgxpool.Pool
	RDB *redis.Client
}

func ProviderCreateEventService(cer *repo.DbCreateEventRepo, db *pgxpool.Pool, rdb *redis.Client) *CreateEventSrv {
	return &CreateEventSrv{
		CEr: cer,
		Db:  db,
		RDB: rdb,
	}
}

func (pr *CreateEventSrv) CreateEventService(c context.Context, data dto.CreateEvent) (string, error) {
	splitData := strings.Split(data.Images, ",")
	if len(splitData) != 2 {
		return "", fmt.Errorf("invalid base64 image")
	}

	imageEvent, err := base64.StdEncoding.DecodeString(splitData[1])
	if err != nil {
		return "", err
	}

	uploadPath := "public/uploads/event"
	fileName := fmt.Sprintf("%s-%d.jpg", strings.ReplaceAll(data.Title, " ", "-"), time.Now().Unix())
	filePath := filepath.Join(uploadPath, fileName)

	if e := os.WriteFile(filePath, imageEvent, 0755); e != nil {
		return "", e
	}

	eventPath := "public/uploads/event/" + fileName

	data.Images = fileName

	tx, err := pr.Db.Begin(c)
	if err != nil {
		os.Remove(filePath)
		return "", err
	}
	defer tx.Rollback(c)

	eventID, err := pr.CEr.CreateEventRepo(c, tx, data)
	if err != nil {
		os.Remove(filePath)
		return "", err
	}

	var speakerID int

	if data.SpeakerID != nil {
		speakerID = *data.SpeakerID
	} else {
		speakerID, err = pr.CEr.CreateSpeakerRepo(c, tx, *data.SpeakerName, *data.PositionJob)
		if err != nil {
			os.Remove(filePath)
			return "", err
		}
	}

	err = pr.CEr.CreateEventRelationRepo(c, tx, eventID, data.CategoryID, speakerID)
	if err != nil {
		os.Remove(filePath)
		return "", err
	}

	if err := tx.Commit(c); err != nil {
		os.Remove(filePath)
		return "", err
	}

	if err := pr.RDB.Del(c, "eventhub:eventfilter").Err(); err == nil {
		return "", err
	}

	return eventPath, nil
}
