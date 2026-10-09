package service

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
)

type TestimonialSrv struct {
	TR *repo.DbTestimonialRepo
}

func ProviderTestimonialService(tr *repo.DbTestimonialRepo) *TestimonialSrv {
	return &TestimonialSrv{
		TR: tr,
	}
}

func (s *TestimonialSrv) GetTestimonials(c context.Context) ([]model.Testimonial, error) {
	return s.TR.GetTestimonials(c)
}

func (s *TestimonialSrv) CreateTestimonial(c context.Context, data dto.CreateTestimonial, userID int) error {
	return s.TR.CreateTestimonial(c, data, userID)
}
