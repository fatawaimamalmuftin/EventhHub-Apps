package repo

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbAdminDashRepo struct {
	Db *pgxpool.Pool
}

func ProviderAdminDashRepo(db *pgxpool.Pool) *DbAdminDashRepo {
	return &DbAdminDashRepo{
		Db: db,
	}
}

func (ps *DbAdminDashRepo) GetAdminDashRepo(c context.Context) (*dto.AdminDashboardResponse, error) {
	q := `
	SELECT
	(SELECT COUNT(*) FROM users) AS total_users,
	(SELECT COUNT(*) FROM events) AS total_event,
	(SELECT COUNT(*) FROM community) AS total_community,
	AVG((attendees::NUMERIC / capacity) * 100) AS avg_fill_rate FROM events;
	`

	var data dto.AdminDashboardResponse

	err := ps.Db.QueryRow(c, q).Scan(
		&data.TotalUsers,
		&data.TotalEvents,
		&data.TotalCommunities,
		&data.AvgFillRate,
	)

	if err != nil {
		return nil, err
	}

	return &data, nil
}
