package service

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
)

type UserProfileSrv struct {
	UPr *repo.DbUserProfileRepo
}

func UserProfileService(upr *repo.DbUserProfileRepo) *UserProfileSrv {
	return &UserProfileSrv{
		UPr: upr,
	}
}

func (u *UserProfileSrv) GetUserProfileSrv(c context.Context, userId int) (*model.UserProfile, error) {
	return u.UPr.GetUserProfileRepo(c, userId)
}

// func (u *UserProfileSrv) ChangeUserProfileSrv(userID int, data dto.ChangeUserProfile) (string, error) {
// 	panic("unimplemented")
// }
