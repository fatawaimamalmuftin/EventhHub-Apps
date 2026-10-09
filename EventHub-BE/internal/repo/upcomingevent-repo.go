package repo

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbUpcomingRepo struct {
	Db *pgxpool.Pool
}

func UpcomingEventRepo(db *pgxpool.Pool) *DbUpcomingRepo {
	return &DbUpcomingRepo{
		Db: db,
	}
}

func (u *DbUpcomingRepo) GetUpcomingEventRepo(c context.Context) ([]model.UpcomingEvent, error) {
	q := `
		SELECT
			id_event,title,images,start_time,end_time,location,attendees,capacity,event_format
		FROM events
		WHERE start_time > NOW()
		ORDER BY start_time ASC;
	`

	rows, err := u.Db.Query(c, q)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var upcomingEvents []model.UpcomingEvent

	for rows.Next() {

		var event model.UpcomingEvent

		err := rows.Scan(
			&event.ID, &event.Title, &event.Images, &event.StartTime, &event.EndTime, &event.Location, &event.Attendees, &event.Capacity, &event.EventFormat,
		)

		if err != nil {
			return nil, err
		}

		upcomingEvents = append(upcomingEvents, event)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return upcomingEvents, nil
}
