package service

import (
	"fmt"
	"mime/multipart"
	"os"
	"path/filepath"
	"time"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
)

type ChangeUserProfileSrvS struct {
	CUPr *repo.DbChangeUserProfileRepoS
}

func ChangeUserProfileService(cupr *repo.DbChangeUserProfileRepoS) *ChangeUserProfileSrvS {
	return &ChangeUserProfileSrvS{
		CUPr: cupr,
	}
}

func (s *ChangeUserProfileSrvS) ChangeUserProfileSrv(userID int, data dto.ChangeUserProfile, file *multipart.FileHeader) (string, error) {
	var profilePath *string

	if file != nil {

		uploadPath := "public/uploads/profile"

		fileName := fmt.Sprintf(
			"user-%d-%d%s",
			userID,
			time.Now().Unix(),
			filepath.Ext(file.Filename),
		)

		filePath := filepath.Join(uploadPath, fileName)

		src, err := file.Open()

		if err != nil {
			return "", err
		}

		defer src.Close()

		dst, err := os.Create(filePath)

		if err != nil {
			return "", err
		}

		defer dst.Close()

		_, err = dst.ReadFrom(src)

		if err != nil {
			return "", err
		}

		path := "/uploads/profile/" + fileName
		profilePath = &path
	}

	err := s.CUPr.ChangeUserProfileRpo(
		userID,
		data,
		profilePath,
	)

	if err != nil {
		return "", err
	}

	if profilePath != nil {
		return *profilePath, nil
	}

	return "", nil
}
