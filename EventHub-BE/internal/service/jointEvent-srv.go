package service

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
)

type JointEventSrv struct {
	JIr *repo.DbJoinEventRepo
}

func JoinEventService(jir *repo.DbJoinEventRepo) *JointEventSrv {
	return &JointEventSrv{
		JIr: jir,
	}
}

func (j *JointEventSrv) CreateJoinEventService(c context.Context, userid, eventid int) error {
	return j.JIr.CreateJoinEventRepo(c, userid, eventid)
}
