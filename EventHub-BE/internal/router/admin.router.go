package router

import (
	"github.com/fatawaimamalmuftin/eventhub-be/internal/handler"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/service"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

func adminRouter(r *gin.Engine, db *pgxpool.Pool) {
	admin := r.Group("/admin")

	adr := repo.ProviderAdminDashRepo(db)
	ads := service.ProviderAdminDashService(adr)
	adh := handler.ProviderAdminDashHandler(ads)

	admin.GET("dashboard", adh.GetAdminDashHdr)
}
