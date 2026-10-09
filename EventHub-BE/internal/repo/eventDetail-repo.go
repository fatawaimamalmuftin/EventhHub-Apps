package repo

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbEventDetailRepo struct {
	Db *pgxpool.Pool
}

func EventDetailRepo(db *pgxpool.Pool) *DbEventDetailRepo {
	return &DbEventDetailRepo{
		Db: db,
	}
}

func (e *DbEventDetailRepo) GetEventDetail(id int, c context.Context) (model.EventDetail, error) {

	q := `
		SELECT 
			e.id_event, e.title, e.images, e.start_time, e.end_time, e.location, e.attendees, e.capacity, e.description, e.event_format, e.community_id, c.title AS community_title, c.images AS community_images,
			COALESCE(
				ARRAY_AGG(DISTINCT cat.name_categories)
				FILTER (WHERE cat.id_categories IS NOT NULL),
				'{}'
			) AS categories
		FROM events e
		JOIN community c
			ON c.id_community = e.community_id
		LEFT JOIN event_categories ec
			ON ec.event_id = e.id_event
		LEFT JOIN categories cat
			ON cat.id_categories = ec.category_id
		WHERE e.id_event = $1
		GROUP BY
			e.id_event, e.title, e.images, e.start_time, e.end_time, e.location, e.attendees, e.capacity, e.description, e.event_format, e.community_id, c.title, c.images;`

	var event model.EventDetail

	err := e.Db.QueryRow(c, q, id).Scan(
		&event.ID, &event.Title, &event.Images, &event.StartTime, &event.EndTime, &event.Location, &event.Attendees, &event.Capacity, &event.Description, &event.EventFormat, &event.CommunityID, &event.CommunityTitle, &event.CommunityImages, &event.Categories,
	)

	if err != nil {
		return model.EventDetail{}, err
	}

	return event, nil
}
