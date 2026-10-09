package handler

import (
	"context"
	"net/http"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	jwtpkg "github.com/fatawaimamalmuftin/eventhub-be/pkg/jwt"
	"github.com/gin-gonic/gin"
)

type IMyEvent interface {
	GetMyEventsService(
		userID int,
		c context.Context,
	) ([]model.MyEvent, error)
}

type MyEventHdr struct {
	MEs IMyEvent
}

func MyEventHandler(mes IMyEvent) *MyEventHdr {
	return &MyEventHdr{
		MEs: mes,
	}
}

// @Summary		Get my events
// @Description	Get events created by the authenticated user
// @Tags		My Events
// @Produce		json
// @Security	BasicAuth
// @Success		200	{object}	dto.Res
// @Failure		401	{object}	dto.Res
// @Failure		500	{object}	dto.Res
// @Router		/events/my [get]
func (m *MyEventHdr) GetMyEventsHandler(c *gin.Context) {

	tokenClaims, exists := c.Get("tokenCleims")

	if !exists {
		c.JSON(http.StatusUnauthorized, dto.Res{
			Status:  false,
			Message: "please login first",
		})
		return
	}

	claims, ok := tokenClaims.(jwtpkg.JWTclem)

	if !ok {
		c.JSON(http.StatusUnauthorized, dto.Res{
			Status:  false,
			Message: "invalid token",
		})
		return
	}

	myEvents, err := m.MEs.GetMyEventsService(
		claims.Id,
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
		Message: "my event retrieved successfully",
		Data:    myEvents,
	})
}
