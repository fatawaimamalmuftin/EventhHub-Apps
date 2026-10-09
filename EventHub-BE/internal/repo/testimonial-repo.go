package repo

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbTestimonialRepo struct {
	Db *pgxpool.Pool
}

func ProviderTestimonialRepo(db *pgxpool.Pool) *DbTestimonialRepo {
	return &DbTestimonialRepo{
		Db: db,
	}
}

func (r *DbTestimonialRepo) GetTestimonials(c context.Context) ([]model.Testimonial, error) {
	q := `
	SELECT
		t.id_testimonial,
		t.text,
		t.users_id,
		u.full_name,
		u.profile,
		u.job
	FROM testimonials t
	JOIN users u
		ON u.id_users = t.users_id
	ORDER BY t.id_testimonial DESC;
	`

	rows, err := r.Db.Query(c, q)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	testimonials := []model.Testimonial{}

	for rows.Next() {
		var testimonial model.Testimonial

		err := rows.Scan(
			&testimonial.ID, &testimonial.Text, &testimonial.UserID, &testimonial.FullName, &testimonial.Profile, &testimonial.Job,
		)

		if err != nil {
			return nil, err
		}

		testimonials = append(testimonials, testimonial)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return testimonials, nil
}

func (r *DbTestimonialRepo) CreateTestimonial(c context.Context, data dto.CreateTestimonial, userID int) error {
	q := `INSERT INTO testimonials (text,users_id) VALUES ($1, $2);`

	_, err := r.Db.Exec(c, q, data.Text, userID)

	return err
}
