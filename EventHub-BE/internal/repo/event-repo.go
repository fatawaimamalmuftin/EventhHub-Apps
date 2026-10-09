package repo

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbEventFilterRepo struct {
	Db *pgxpool.Pool
}

func EventsFilterRepo(db *pgxpool.Pool) *DbEventFilterRepo {
	return &DbEventFilterRepo{
		Db: db,
	}
}

func (e *DbEventFilterRepo) GetEvents(c context.Context, eventQuery dto.EventQuery) ([]model.Event, error) {

	q := `
		SELECT
			e.id_event, e.title, e.images, e.start_time, e.end_time, e.location, e.attendees, e.capacity, e.description, e.event_format, e.community_id, c.title AS community_title,
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
		WHERE e.title ILIKE '%' || $1 || '%'
	`

	args := []any{
		eventQuery.Search,
	}

	argNumber := 2

	if len(eventQuery.Categories) > 0 {
		q += `
			AND EXISTS (
				SELECT 1
				FROM event_categories ec_filter
				JOIN categories cat_filter
					ON cat_filter.id_categories = ec_filter.category_id
				WHERE ec_filter.event_id = e.id_event
				AND cat_filter.name_categories = ANY($` + string(rune('0'+argNumber)) + `)
			)
		`

		args = append(args, eventQuery.Categories)
		argNumber++
	}

	if len(eventQuery.Locations) > 0 {
		q += `AND e.location = ANY($` + string(rune('0'+argNumber)) + `)`

		args = append(args, eventQuery.Locations)
		argNumber++
	}

	if len(eventQuery.Formats) > 0 {
		q += `AND e.event_format = ANY($` + string(rune('0'+argNumber)) + `)`

		args = append(args, eventQuery.Formats)
		argNumber++
	}

	q += `
		GROUP BY
			e.id_event, e.title, e.images, e.start_time, e.end_time, e.location, e.attendees, e.capacity, e.description, e.event_format, e.community_id, c.title
		ORDER BY e.start_time ASC;`

	rows, err := e.Db.Query(c, q, args...)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var events []model.Event

	for rows.Next() {
		var event model.Event

		err := rows.Scan(
			&event.ID, &event.Title, &event.Images, &event.StartTime, &event.EndTime, &event.Location, &event.Attendees, &event.Capacity, &event.Description, &event.EventFormat, &event.CommunityID, &event.CommunityTitle, &event.Categories,
		)

		if err != nil {
			return nil, err
		}

		events = append(events, event)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return events, nil
}
