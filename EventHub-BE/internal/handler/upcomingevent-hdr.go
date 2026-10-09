package handler

import (
	"context"
	"net/http"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/gin-gonic/gin"
)

type IUpcomingEvent interface {
	GetUpcomingEventService(
		c context.Context,
	) ([]model.UpcomingEvent, error)
}

type UpcomingEventS struct {
	UCr IUpcomingEvent
}

func UpcomingEventHandler(ucr IUpcomingEvent) *UpcomingEventS {
	return &UpcomingEventS{
		UCr: ucr,
	}
}

// GetUpcomingEventHandler godoc
// @Summary      Get upcoming events
// @Description  Get list of all upcoming events
// @Tags         events upcomming
// @Accept       json
// @Produce      json
// @Success      200  {object}  dto.Res{data=[]model.UpcomingEvent}  "success get upcoming events"
// @Failure      500  {object}  dto.Res                             "failed to get upcoming events"
// @Router       /events/upcoming [get]
func (u *UpcomingEventS) GetUpcomingEventHandler(c *gin.Context) {

	upcomingEvents, err := u.UCr.GetUpcomingEventService(
		c.Request.Context(),
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, dto.Res{
			Status:  false,
			Message: "failed to get upcoming events",
		})
		return
	}

	c.JSON(http.StatusOK, dto.Res{
		Status:  true,
		Message: "success get upcoming events",
		Data:    upcomingEvents,
	})
}
