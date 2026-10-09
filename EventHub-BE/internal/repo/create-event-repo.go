package repo

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbCreateEventRepo struct {
	Db *pgxpool.Pool
}

func ProviderCreateEventRepo(db *pgxpool.Pool) *DbCreateEventRepo {
	return &DbCreateEventRepo{
		Db: db,
	}
}

func (pr *DbCreateEventRepo) CreateEventRepo(c context.Context, tx pgx.Tx, data dto.CreateEvent) (int, error) {
	q := `
	INSERT INTO events ( 
	title, images, start_time, end_time, location, attendees, capacity, description, event_format, community_id)
	VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id_event;
	`

	var eventID int

	err := tx.QueryRow(c, q,
		data.Title, data.Images, data.StartTime, data.EndTime, data.Location, 0, data.Capacity, data.Description, data.EventFormat, data.CommunityID,
	).Scan(&eventID)

	if err != nil {
		return 0, err
	}

	return eventID, nil
}

func (pr *DbCreateEventRepo) CreateSpeakerRepo(c context.Context, tx pgx.Tx, name, positionJob string) (int, error) {
	q := `INSERT INTO speaker (name, position_job) VALUES ($1, $2) RETURNING id_speaker;`
	// INSERT INTO speaker (name, position_job) VALUES ('Arif Pratama', 'Senior Backend Engineer');

	var speakerID int

	err := tx.QueryRow(c, q, name, positionJob).Scan(&speakerID)

	if err != nil {
		return 0, err
	}

	return speakerID, nil
}

func (pr *DbCreateEventRepo) CreateEventRelationRepo(c context.Context, tx pgx.Tx, eventID, categoryID, speakerID int) error {
	categoryQ := `INSERT INTO event_categories (event_id, category_id) VALUES ($1, $2)`

	_, err := tx.Exec(c, categoryQ, eventID, categoryID)
	if err != nil {
		return err
	}

	speakerQ := `INSERT INTO event_speakers (event_id, speaker_id) VALUES ($1, $2)`

	_, err = tx.Exec(c, speakerQ, eventID, speakerID)
	if err != nil {
		return err
	}

	return nil
}
