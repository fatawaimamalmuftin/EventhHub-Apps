package service

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
)

type AdminDashSrv struct {
	ADr *repo.DbAdminDashRepo
}

func ProviderAdminDashService(adr *repo.DbAdminDashRepo) *AdminDashSrv {
	return &AdminDashSrv{
		ADr: adr,
	}
}

func (ps *AdminDashSrv) GetAdminDashSrv(c context.Context) (*dto.AdminDashboardResponse, error) {
	return ps.ADr.GetAdminDashRepo(c)
}
