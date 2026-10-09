package router

import (
	"github.com/fatawaimamalmuftin/eventhub-be/internal/handler"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/service"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

func communityRouter(r *gin.Engine, db *pgxpool.Pool) {
	community := r.Group("/communities")

	cdr := repo.ProviderCommunityDetailRepo(db)
	cds := service.ProviderCommunityDetailService(cdr)
	cdh := handler.ProviderCommunityDetailHandler(cds)

	community.GET(":id", cdh.GetCommunityDetail)

	cr := repo.ProviderCommunityRepo(db)
	cs := service.ProviderCommunityService(cr)
	ch := handler.ProviderCommunityHandler(cs)

	community.GET("popular", ch.GetPopularCommunities)
}
