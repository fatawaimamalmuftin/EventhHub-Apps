package service

import (
	"context"
	"encoding/json"
	"log"
	"time"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
	"github.com/redis/go-redis/v9"
)

type MyEventSrv struct {
	MEr   *repo.DbMyEventRepo
	MEred *redis.Client
}

func MyEventService(mer *repo.DbMyEventRepo, meed *redis.Client) *MyEventSrv {
	return &MyEventSrv{
		MEr:   mer,
		MEred: meed,
	}
}

func (m *MyEventSrv) GetMyEventsService(userID int, c context.Context) ([]model.MyEvent, error) {
	myEvent, err := m.MEred.Get(c, "eventhub:myevent").Result()
	if err == nil {
		var myEventRed []model.MyEvent

		if err := json.Unmarshal([]byte(myEvent), &myEventRed); err != nil {
			log.Println("error unmarshal redis:", err)
		}
		log.Println("get from redis")
		return myEventRed, nil
	}
	log.Println("get from db")

	myEventDb, err := m.MEr.GetMyEventsRepo(userID, c)
	if err != nil {
		return []model.MyEvent{}, err
	}

	err = m.MEred.Set(c, "eventhub:myevent", myEventDb, 5*time.Minute).Err()
	if err != nil {
		log.Println("error set cache:", err)
	}
	return myEventDb, nil
}
