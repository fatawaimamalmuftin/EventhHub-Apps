package handler

import (
	"context"
	"net/http"

	cuserror "github.com/fatawaimamalmuftin/eventhub-be/internal/CusError"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/gin-gonic/gin"
)

type ICreateEvent interface {
	CreateEventService(c context.Context, data dto.CreateEvent) (string, error)
}

type CreateEventHandler struct {
	CEs ICreateEvent
}

func ProviderCreateEventHandler(ces ICreateEvent) *CreateEventHandler {
	return &CreateEventHandler{
		CEs: ces,
	}
}

// CreateEventHdr godoc
// @Summary      Create a new event
// @Description  Create a new event using JSON payload
// @Tags         create events
// @Accept       json
// @Produce      json
// @Security     BasicAuth
// @Param        request  body      dto.CreateEvent  true  "Create event payload"
// @Success      200      {object}  dto.Res{data=string}  "event created success"
// @Failure      400      {object}  dto.Res               "failed to bind"
// @Failure      500      {object}  dto.Res               "internal server error"
// @Router       /events/createEvent [post]
func (pr *CreateEventHandler) CreateEventHdr(c *gin.Context) {
	var event dto.CreateEvent

	if e := c.ShouldBindBodyWithJSON(&event); e != nil {
		c.JSON(http.StatusBadRequest, dto.Res{
			Status:  false,
			Message: "failed to bind",
		})
		return
	}

	eventPath, err := pr.CEs.CreateEventService(c.Request.Context(), event)
	if err != nil {
		c.JSON(http.StatusInternalServerError, dto.Res{
			Status:  false,
			Message: cuserror.InternalError.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, dto.Res{
		Status:  true,
		Message: "event created success",
		Data:    eventPath,
	})
}
