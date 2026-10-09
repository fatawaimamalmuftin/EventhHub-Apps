package router

import (
	"github.com/fatawaimamalmuftin/eventhub-be/internal/handler"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/middleware"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/service"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

func testimonialRouter(r *gin.Engine, db *pgxpool.Pool, rdb *redis.Client) {
	testimonial := r.Group("/testimonials")
	
	jwtMiddleware := func(c *gin.Context) {
		middleware.CheckJWTtoken(c, rdb)
	}

	tr := repo.ProviderTestimonialRepo(db)
	ts := service.ProviderTestimonialService(tr)
	th := handler.ProviderTestimonialHandler(ts)

	testimonial.GET("", th.GetTestimonials)

	testimonial.POST("", jwtMiddleware, th.CreateTestimonial)
}
