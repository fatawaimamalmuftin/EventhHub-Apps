package handler

import (
	"context"
	"net/http"
	"strconv"

	cuserror "github.com/fatawaimamalmuftin/eventhub-be/internal/CusError"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	jwtpkg "github.com/fatawaimamalmuftin/eventhub-be/pkg/jwt"
	"github.com/gin-gonic/gin"
)

type ILeaveEvent interface {
	CreateLeaveEventService(c context.Context, userId, eventId int) error
}

type LeaveEventHdr struct {
	LES ILeaveEvent
}

func LeaveEventHandler(les ILeaveEvent) *LeaveEventHdr {
	return &LeaveEventHdr{
		LES: les,
	}
}

// CreateLeaveEventHandler godoc
// @Summary      Leave an event
// @Description  Leave an event that the user previously joined
// @Tags         leave events
// @Accept       json
// @Produce      json
// @Security     BasicAuth
// @Param        eventId  path      int      true  "Event ID"
// @Success      200      {object}  dto.Res  "left event successfully"
// @Failure      400      {object}  dto.Res  "invalid event id"
// @Failure      401      {object}  dto.Res  "please login first / invalid token"
// @Failure      404      {object}  dto.Res  "you have not joined this event"
// @Failure      500      {object}  dto.Res  "failed to leave event"
// @Router       /user/{eventId}/leave [get]
func (l *LeaveEventHdr) CreateLeaveEventHandler(c *gin.Context) {
	tokenClaims, exists := c.Get("tokenCleims")

	if !exists {
		c.JSON(http.StatusUnauthorized, dto.Res{
			Status:  false,
			Message: "please login first",
		})
		return
	}

	userId, ok := tokenClaims.(jwtpkg.JWTclem)

	if !ok {
		c.JSON(http.StatusUnauthorized, dto.Res{
			Status:  false,
			Message: "invalid token",
		})
		return
	}

	eventParam := c.Param("eventId")

	eventId, err := strconv.Atoi(eventParam)

	if err != nil {
		c.JSON(http.StatusBadRequest, dto.Res{
			Status:  false,
			Message: "invalid event id",
		})
		return
	}

	handleError := l.LES.CreateLeaveEventService(
		c.Request.Context(),
		userId.Id,
		eventId,
	)

	if handleError != nil {

		if handleError == cuserror.NotJoined {
			c.JSON(http.StatusNotFound, dto.Res{
				Status:  false,
				Message: "you have not joined this event",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, dto.Res{
			Status:  false,
			Message: "failed to leave event",
		})
		return
	}

	c.JSON(http.StatusOK, dto.Res{
		Status:  true,
		Message: "left event successfully",
	})
}
