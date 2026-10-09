package handler

import (
	"context"
	"net/http"
	"strings"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/gin-gonic/gin"
)

type ILogoutSrv interface {
	Logout(token string, c context.Context) error
}

type LogoutHdr struct {
	Ls ILogoutSrv
}

func LogoutHandler(logoutService ILogoutSrv, c *gin.Engine) *LogoutHdr {
	return &LogoutHdr{
		Ls: logoutService,
	}
}

// LogoutHdr godoc
// @Summary      Logout user
// @Description  Invalidate user bearer token for logout
// @Tags         logout
// @Accept       json
// @Produce      json
// @Security     BasicAuth
// @Success      200  {object}  dto.Res  "logout success"
// @Failure      401  {object}  dto.Res  "invalid bearer token"
// @Failure      500  {object}  dto.Res  "internal server error"
// @Router       /auth/logout [post]
func (l *LogoutHdr) LogoutHdr(c *gin.Context) {
	authorization := c.GetHeader("Authorization")

	bearerPath := strings.Split(authorization, " ")

	if len(bearerPath) != 2 {
		c.JSON(http.StatusUnauthorized, dto.Res{
			Status:  false,
			Message: "invalid bearer token",
		})
		return
	}

	if err := l.Ls.Logout(bearerPath[1], c.Request.Context()); err != nil {
		c.JSON(http.StatusInternalServerError, dto.Res{
			Status:  false,
			Message: "internal server error",
		})
		return
	}

	c.JSON(http.StatusOK, dto.Res{
		Status:  true,
		Message: "logout success",
	})
}
