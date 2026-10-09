package service

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
)

type GetMyNotifRepo struct {
	GMr *repo.DbGetMyNotif
}

func ProviderGetMyNotifService(gmr *repo.DbGetMyNotif) *GetMyNotifRepo {
	return &GetMyNotifRepo{
		GMr: gmr,
	}
}

func (pr *GetMyNotifRepo) GetMyNotifSrv(userId int, c context.Context) ([]model.MyNotif, error) {
	return pr.GMr.GetMyNotifRpo(userId, c)
}
