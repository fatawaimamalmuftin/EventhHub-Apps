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

func userRouter(r *gin.Engine, db *pgxpool.Pool, rdb *redis.Client) {
	user := r.Group("/user")

	jwtMiddleware := func(c *gin.Context) {
		middleware.CheckJWTtoken(c, rdb)
	}

	jer := repo.JoinEventRepo(db)
	jes := service.JoinEventService(jer)
	jeh := handler.JoinEventHandler(jes)

	user.GET(":eventId/join", jwtMiddleware, jeh.CreateJoinEventHandler)

	ler := repo.LeaveEventRepo(db)
	les := service.LeaveEventService(ler)
	leh := handler.LeaveEventHandler(les)

	user.GET(":eventId/leave", jwtMiddleware, leh.CreateLeaveEventHandler)

	upr := repo.UserProfileRepo(db)
	ups := service.UserProfileService(upr)
	uph := handler.UserProfileHandler(ups)

	user.GET("profile", jwtMiddleware, uph.GetUserProfileHandler)
}
