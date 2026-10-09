package service

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
)

type LeaveEventSrv struct {
	LEr *repo.DbLeaveEventRepo
}

func LeaveEventService(ler *repo.DbLeaveEventRepo) *LeaveEventSrv {
	return &LeaveEventSrv{
		LEr: ler,
	}
}

func (l *LeaveEventSrv) CreateLeaveEventService(c context.Context, userId, eventId int) error {
	return l.LEr.CreateLeaveEventRepo(c, userId, eventId)
}
