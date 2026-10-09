package repo

import (
	"context"
	"strings"

	cuserror "github.com/fatawaimamalmuftin/eventhub-be/internal/CusError"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbJoinEventRepo struct {
	Db *pgxpool.Pool
}

func JoinEventRepo(db *pgxpool.Pool) *DbJoinEventRepo {
	return &DbJoinEventRepo{
		Db: db,
	}
}

func (d *DbJoinEventRepo) CreateJoinEventRepo(c context.Context, userId, eventId int) error {
	q := `INSERT INTO user_event (users_id, events_id) VALUES ($1, $2);`

	_, err := d.Db.Exec(c, q, userId, eventId)
	if err != nil {
		if strings.Contains(err.Error(), "duplicate key") {
			return cuserror.AlreadyJoin
		}
		return cuserror.InternalError
	}
	return nil
}
