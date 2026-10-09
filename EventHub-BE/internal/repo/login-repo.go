package repo

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbLoginRepo struct {
	Db *pgxpool.Pool
}

func LoginRepo(db *pgxpool.Pool) *DbLoginRepo {
	return &DbLoginRepo{
		Db: db,
	}
}

func (d *DbLoginRepo) GetUserByEmail(email string, c context.Context) (model.User, error) {
	q := "SELECT id_users, full_name, email, password, bio, location, profile, job, created_at, update_at FROM users WHERE email = $1;"

	var user model.User

	err := d.Db.QueryRow(c, q, email).Scan(
		&user.ID, &user.FullName, &user.Email, &user.Password, &user.Bio, &user.Location, &user.Profile, &user.Job, &user.Created_at, &user.Update_at,
	)

	if err != nil {
		return model.User{}, err
	}

	return user, nil
}
