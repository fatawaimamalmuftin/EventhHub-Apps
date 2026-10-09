package repo

import (
	"context"

	cuserror "github.com/fatawaimamalmuftin/eventhub-be/internal/CusError"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbLeaveEventRepo struct {
	Db *pgxpool.Pool
}

func LeaveEventRepo(db *pgxpool.Pool) *DbLeaveEventRepo {
	return &DbLeaveEventRepo{
		Db: db,
	}
}

func (d *DbLeaveEventRepo) CreateLeaveEventRepo(c context.Context, userId, eventId int) error {
	q := `
		DELETE FROM user_event
		WHERE users_id = $1
		AND events_id = $2;
	`

	result, err := d.Db.Exec(c, q, userId, eventId)

	if err != nil {
		return cuserror.InternalError
	}

	if result.RowsAffected() == 0 {
		return cuserror.NotJoined
	}

	return nil
}
