package handler

import (
	"context"
	"net/http"
	"strconv"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/gin-gonic/gin"
)

type IEventsDetailSrv interface {
	GetEventDetail(
		id int,
		c context.Context,
	) (model.EventDetail, error)
}

type EventDetail struct {
	EDh IEventsDetailSrv
}

func EventDetailHandler(edh IEventsDetailSrv) *EventDetail {
	return &EventDetail{
		EDh: edh,
	}
}

// GetEventDetail godoc
// @Summary      Get event detail
// @Description  Get detailed information of a specific event by its ID
// @Tags         events
// @Accept       json
// @Produce      json
// @Param        id   path      int      true  "Event ID"
// @Success      200  {object}  dto.Res{data=model.EventDetail}  "event detail retrieved successfully"
// @Failure      400  {object}  dto.Res                          "invalid event id"
// @Failure      500  {object}  dto.Res                          "internal server error"
// @Router       /events/{id} [get]
func (e *EventDetail) GetEventDetail(c *gin.Context) {

	eventID, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, dto.Res{
			Status:  false,
			Message: "invalid event id",
		})
		return
	}

	event, err := e.EDh.GetEventDetail(
		eventID,
		c.Request.Context(),
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
		Message: "event detail retrieved successfully",
		Data:    event,
	})
}
