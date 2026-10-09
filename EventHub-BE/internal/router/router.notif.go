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

func notifRouter(r *gin.Engine, db *pgxpool.Pool, rdb *redis.Client) {
	notification := r.Group("/notification")

	jwtMid := func(c *gin.Context) {
		middleware.CheckJWTtoken(c, rdb)
	}

	gmr := repo.ProviderGetMyNotifRepo(db)
	gms := service.ProviderGetMyNotifService(gmr)
	gmh := handler.ProviderGetMyNotifHandler(gms)

	notification.GET("my", jwtMid, gmh.GetMyNotifHdr)
}
