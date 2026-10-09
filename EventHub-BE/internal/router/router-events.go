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

func eventRouter(r *gin.Engine, db *pgxpool.Pool, rdb *redis.Client) {
	event := r.Group("/events")

	efr := repo.EventsFilterRepo(db)
	efs := service.EventsFilterService(efr)
	efh := handler.EventsFilterHandler(efs)

	event.GET("", efh.GetEvents)

	edr := repo.EventDetailRepo(db)
	eds := service.EventDetailService(edr)
	edh := handler.EventDetailHandler(eds)

	event.GET(":id", edh.GetEventDetail)

	mer := repo.MyEventRepo(db)
	mes := service.MyEventService(mer, rdb)
	meh := handler.MyEventHandler(mes)

	event.GET("my", func(c *gin.Context) { middleware.CheckJWTtoken(c, rdb) }, meh.GetMyEventsHandler)

	cupr := repo.ChangeUserProfileRepo(db)
	cups := service.ChangeUserProfileService(cupr)
	cuph := handler.ChangeUserProfileHandler(cups)

	event.PATCH("changeuserprofile", func(c *gin.Context) { middleware.CheckJWTtoken(c, rdb) }, cuph.ChangeUserProfileHdr)

	ucr := repo.UpcomingEventRepo(db)
	ucs := service.UpcomingEventSevice(ucr)
	uch := handler.UpcomingEventHandler(ucs)

	event.GET("upcoming", uch.GetUpcomingEventHandler)

	cer := repo.ProviderCreateEventRepo(db)
	ces := service.ProviderCreateEventService(cer, db, rdb)
	ceh := handler.ProviderCreateEventHandler(ces)

	event.POST("createEvent", ceh.CreateEventHdr)
}
