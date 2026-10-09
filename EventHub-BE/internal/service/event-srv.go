package service

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
)

type EventsFilterSrvS struct {
	EFr *repo.DbEventFilterRepo
}

func EventsFilterService(efr *repo.DbEventFilterRepo) *EventsFilterSrvS {
	return &EventsFilterSrvS{
		EFr: efr,
	}
}

func (e *EventsFilterSrvS) GetEvents(c context.Context, eventQuery dto.EventQuery) ([]model.Event, error) {
	events, err := e.EFr.GetEvents(c, eventQuery)
	if err != nil {
		return []model.Event{}, err
	}

	return events, nil
}
