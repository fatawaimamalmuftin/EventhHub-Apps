package repo

import (
	"context"

	cuserror "github.com/fatawaimamalmuftin/eventhub-be/internal/CusError"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbRegisRepo struct {
	db *pgxpool.Pool
}

func RegisRepo(db *pgxpool.Pool) *DbRegisRepo {
	return &DbRegisRepo{
		db: db,
	}
}

func (d *DbRegisRepo) IsExist(c context.Context, newUser model.Regis) (int, error) {
	q := "SELECT (id_users) FROM users WHERE full_name = $1 OR email = $2;"
	arg := []any{newUser.FullName, newUser.Email}

	var id int

	err := d.db.QueryRow(c, q, arg...).Scan(&id)

	if err != nil {
		return 0, err
	}

	return id, nil
}

func (d *DbRegisRepo) NewAccount(c context.Context, newUser model.Regis) error {
	q := "INSERT INTO users (full_name,email,password) VALUES ($1, $2, $3);"
	arg := []any{newUser.FullName, newUser.Email, newUser.Password}

	data, err := d.db.Exec(c, q, arg...)

	if err != nil {
		return err
	}

	if data.RowsAffected() == 0 {
		return cuserror.ErrNoRowAffected
	}

	return nil
}
