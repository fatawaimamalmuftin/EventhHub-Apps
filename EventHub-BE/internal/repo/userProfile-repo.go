package repo

import (
	"context"

	cuserror "github.com/fatawaimamalmuftin/eventhub-be/internal/CusError"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbUserProfileRepo struct {
	Db *pgxpool.Pool
}

func UserProfileRepo(db *pgxpool.Pool) *DbUserProfileRepo {
	return &DbUserProfileRepo{
		Db: db,
	}
}

func (u *DbUserProfileRepo) GetUserProfileRepo(c context.Context, userId int) (*model.UserProfile, error) {
	q := `
		SELECT
			id_users, full_name, email, bio, location, profile, job
		FROM users
		WHERE id_users = $1;
	`

	var user model.UserProfile

	err := u.Db.QueryRow(c, q, userId).Scan(
		&user.ID,
		&user.FullName,
		&user.Email,
		&user.Bio,
		&user.Location,
		&user.Profile,
		&user.Job,
	)

	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, cuserror.UserNotFound
		}

		return nil, err
	}

	return &user, nil
}
