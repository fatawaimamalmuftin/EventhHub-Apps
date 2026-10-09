package service

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
)

type UpcomingR struct {
	UCr *repo.DbUpcomingRepo
}

func UpcomingEventSevice(ucr *repo.DbUpcomingRepo) *UpcomingR {
	return &UpcomingR{
		UCr: ucr,
	}
}

func (u *UpcomingR) GetUpcomingEventService(
	c context.Context,
) ([]model.UpcomingEvent, error) {

	return u.UCr.GetUpcomingEventRepo(c)
}
