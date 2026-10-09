package router

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/handler"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/middleware"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/service"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

func authRouter(r *gin.Engine, db *pgxpool.Pool, rdb *redis.Client, c *context.Context) {

	Auth := r.Group("/auth")

	rr := repo.RegisRepo(db)
	rs := service.RegisService(rr)
	rh := handler.RegisHandler(rs)
	Auth.POST("regis", rh.Regis)

	lr := repo.LoginRepo(db)
	ls := service.LoginService(lr)
	lh := handler.LoginHandler(ls)
	Auth.POST("login", lh.Login)

	los := service.LogoutService(rdb, c)
	loh := handler.LogoutHandler(los, r)

	Auth.POST("logout", func(c *gin.Context) { middleware.CheckJWTtoken(c, rdb) }, loh.LogoutHdr)
}
