package handler

import (
	"context"
	"net/http"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/gin-gonic/gin"
)

type IEventsFilterSrv interface {
	GetEvents(
		c context.Context,
		eventQuery dto.EventQuery,
	) ([]model.Event, error)
}

type EventsFilter struct {
	EFh IEventsFilterSrv
}

func EventsFilterHandler(efr IEventsFilterSrv) *EventsFilter {
	return &EventsFilter{
		EFh: efr,
	}
}

// @Summary		Get all events
// @Description	don`t need token
// @Tags		Get all events with filter
// @Produce		json
// @Success		200  {object}  dto.Res
// @Failure		500  {object}  dto.Res
// @Router		/events [get]
func (e *EventsFilter) GetEvents(c *gin.Context) {

	eventQuery := dto.EventQuery{
		Search:     c.Query("search"),
		Categories: c.QueryArray("category"),
		Locations:  c.QueryArray("location"),
		Formats:    c.QueryArray("format"),
		SortBy:     c.Query("sort"),
	}

	events, err := e.EFh.GetEvents(
		c.Request.Context(),
		eventQuery,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, dto.Res{
			Status:  false,
			Message: "internal server error",
		})
		return
	}

	c.JSON(http.StatusOK, dto.Res{
		Status:  true,
		Message: "event list retrieved successfully",
		Data:    events,
	})
}
