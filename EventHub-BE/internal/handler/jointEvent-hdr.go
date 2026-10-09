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

type IJoinEvent interface {
	CreateJoinEventService(c context.Context, userid, eventid int) error
}

type JoinEventHdr struct {
	JEs IJoinEvent
}

func JoinEventHandler(jes IJoinEvent) *JoinEventHdr {
	return &JoinEventHdr{
		JEs: jes,
	}
}

// CreateJoinEventHandler godoc
// @Summary      Join an event
// @Description  Join an event by providing the event ID
// @Tags         join events
// @Accept       json
// @Produce      json
// @Security     BasicAuth
// @Param        eventId  path      int      true  "Event ID"
// @Success      200      {object}  dto.Res  "joined event success"
// @Failure      400      {object}  dto.Res  "invalid event id"
// @Failure      401      {object}  dto.Res  "please login first / invalid token"
// @Failure      409      {object}  dto.Res  "you already joined this event"
// @Failure      500      {object}  dto.Res  "failed to join event"
// @Router       /user/{eventId}/join [get]
func (j *JoinEventHdr) CreateJoinEventHandler(c *gin.Context) {
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

	handleError := j.JEs.CreateJoinEventService(c.Request.Context(), userId.Id, eventId)

	if handleError != nil {

		if handleError == cuserror.AlreadyJoin {
			c.JSON(http.StatusConflict, dto.Res{
				Status:  false,
				Message: "you already joined this event",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, dto.Res{
			Status:  false,
			Message: "failed to join event",
		})
		return
	}

	c.JSON(http.StatusOK, dto.Res{
		Status:  true,
		Message: "joined event success",
	})
}
