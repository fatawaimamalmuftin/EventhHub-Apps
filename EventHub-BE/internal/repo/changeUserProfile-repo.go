package repo

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbChangeUserProfileRepoS struct {
	Db *pgxpool.Pool
}

func ChangeUserProfileRepo(db *pgxpool.Pool) *DbChangeUserProfileRepoS {
	return &DbChangeUserProfileRepoS{
		Db: db,
	}
}

func (d *DbChangeUserProfileRepoS) ChangeUserProfileRpo(userID int, data dto.ChangeUserProfile, profilePath *string) error {
	q := `
		UPDATE users
		SET
			bio = COALESCE($1, bio),
			location = COALESCE($2, location),
			job = COALESCE($3, job),
			profile = COALESCE($4, profile),
			update_at = CURRENT_TIMESTAMP
		WHERE id_users = $5;
	`

	_, err := d.Db.Exec(
		context.Background(),
		q,
		data.Bio,
		data.Location,
		data.Job,
		profilePath,
		userID,
	)

	return err
}
