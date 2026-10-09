package repo

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbGetMyNotif struct {
	Db *pgxpool.Pool
}

func ProviderGetMyNotifRepo(db *pgxpool.Pool) *DbGetMyNotif {
	return &DbGetMyNotif{
		Db: db,
	}
}

func (pr *DbGetMyNotif) GetMyNotifRpo(userId int, c context.Context) ([]model.MyNotif, error) {
	q := `
	SELECT
		id_notification,
		title,
		description,
		time,
		type,
		read_at
	FROM notifications
	WHERE users_id = $1
	ORDER BY time DESC;`

	rows, err := pr.Db.Query(c, q, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var myNotifs []model.MyNotif

	for rows.Next() {
		var notif model.MyNotif

		err = rows.Scan(
			&notif.Id_notif, &notif.Title, &notif.Desk, &notif.Time, &notif.Type, &notif.Read_at,
		)
		if err != nil {
			return nil, err
		}

		myNotifs = append(myNotifs, notif)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return myNotifs, nil
}
