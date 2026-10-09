package service

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
)

type CommunitySrv struct {
	CR *repo.DbCommunityRepo
}

func ProviderCommunityService(cr *repo.DbCommunityRepo) *CommunitySrv {
	return &CommunitySrv{
		CR: cr,
	}
}

func (s *CommunitySrv) GetPopularCommunities(c context.Context) ([]model.PopularCommunity, error) {
	return s.CR.GetPopularCommunities(c)
}
