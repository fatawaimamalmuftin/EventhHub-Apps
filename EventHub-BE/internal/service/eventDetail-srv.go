package service

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
)

type EventDetailSrvS struct {
	EDr *repo.DbEventDetailRepo
}

func EventDetailService(edr *repo.DbEventDetailRepo) *EventDetailSrvS {
	return &EventDetailSrvS{
		EDr: edr,
	}
}

func (e *EventDetailSrvS) GetEventDetail(id int, c context.Context) (model.EventDetail, error) {
	return e.EDr.GetEventDetail(id, c)
}
