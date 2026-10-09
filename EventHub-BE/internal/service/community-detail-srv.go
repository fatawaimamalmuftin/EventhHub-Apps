package service

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
)

type CommunityDetailSrv struct {
	CDr *repo.DbCommunityDetailRepo
}

func ProviderCommunityDetailService(cdr *repo.DbCommunityDetailRepo) *CommunityDetailSrv {
	return &CommunityDetailSrv{
		CDr: cdr,
	}
}

func (s *CommunityDetailSrv) GetCommunityDetail(id int, c context.Context) (model.CommunityDetail, error) {
	return s.CDr.GetCommunityDetail(id, c)
}
