package handler

import (
	"context"
	"errors"
	"net/http"

	cuserror "github.com/fatawaimamalmuftin/eventhub-be/internal/CusError"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/gin-gonic/gin"
)

type ILoginSrv interface {
	LoginSrv(c context.Context, user *dto.Account) (string, dto.UserLogind, error)
}

type LoginHdr struct {
	Lh ILoginSrv
}

func LoginHandler(ls ILoginSrv) *LoginHdr {
	return &LoginHdr{
		Lh: ls,
	}
}

// @Summary		Login
// @Description	login need token
// @Tags		login
// @Accept		json
// @Produce		json
// @Param		account	body	dto.Account	true	"Login credential"
// @Success		200  {object}  dto.Res
// @Failure		400  {object}  dto.Res
// @Failure		401  {object}  dto.Res
// @Failure		500  {object}  dto.Res
// @Router		/auth/login [post]
func (l *LoginHdr) Login(c *gin.Context) {
	logind := dto.Account{}

	if e := c.ShouldBindBodyWithJSON(&logind); e != nil {
		c.JSON(http.StatusBadRequest, dto.Res{
			Status:  false,
			Message: cuserror.ErrBinding,
		})
		return
	}

	token, userLogind, errService := l.Lh.LoginSrv(c.Request.Context(), &logind)

	if errService != nil {
		if errService == cuserror.LenPas {
			c.JSON(http.StatusBadRequest, dto.Res{
				Status:  false,
				Message: errService.Error(),
			})
			return
		}

		if errors.Is(errService, cuserror.InvalidEmail) {
			c.JSON(http.StatusBadRequest, dto.Res{
				Status:  false,
				Message: errService.Error(),
			})
			return
		}

		if errors.Is(errService, cuserror.InvalidCredential) {
			c.JSON(http.StatusUnauthorized, dto.Res{
				Status:  false,
				Message: errService.Error(),
			})
			return
		}

		if errors.Is(errService, cuserror.InvalidHash) {
			c.JSON(http.StatusInternalServerError, dto.Res{
				Status:  false,
				Message: errService.Error(),
			})
			return
		}

		if errors.Is(errService, cuserror.InternalError) {
			c.JSON(http.StatusInternalServerError, dto.Res{
				Status:  false,
				Message: errService.Error(),
			})
			return
		}

		c.JSON(http.StatusInternalServerError, dto.Res{
			Status:  false,
			Message: cuserror.InternalError.Error(),
		})
		return

	}

	c.JSON(http.StatusOK, dto.Res{
		Status:  true,
		Message: "login success",
		Token:   token,
		Data:    userLogind,
	})
}
