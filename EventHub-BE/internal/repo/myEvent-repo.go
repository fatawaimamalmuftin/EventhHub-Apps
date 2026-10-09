package repo

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbMyEventRepo struct {
	Db *pgxpool.Pool
}

func MyEventRepo(db *pgxpool.Pool) *DbMyEventRepo {
	return &DbMyEventRepo{
		Db: db,
	}
}

func (d *DbMyEventRepo) GetMyEventsRepo(
	userID int,
	c context.Context,
) ([]model.MyEvent, error) {

	q := `
		SELECT
			e.id_event,
			e.title,
			e.images,
			e.start_time,
			e.end_time,
			e.location,
			e.attendees,
			e.capacity,
			e.event_format
		FROM events e
		JOIN user_event ue
			ON ue.events_id = e.id_event
		WHERE ue.users_id = $1
		ORDER BY e.start_time ASC;
	`

	rows, err := d.Db.Query(c, q, userID)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var myEvents []model.MyEvent

	for rows.Next() {
		var event model.MyEvent

		err := rows.Scan(
			&event.ID,
			&event.Title,
			&event.Images,
			&event.StartTime,
			&event.EndTime,
			&event.Location,
			&event.Attendees,
			&event.Capacity,
			&event.EventFormat,
		)

		if err != nil {
			return nil, err
		}

		myEvents = append(myEvents, event)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return myEvents, nil
}
