package handler

import (
	"context"
	"net/http"

	cuserror "github.com/fatawaimamalmuftin/eventhub-be/internal/CusError"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
)

type IRegisSrv interface {
	RegisSrv(newUser *model.Regis, c context.Context) error
}

type RegisHdr struct {
	Rh IRegisSrv
}

func RegisHandler(rs IRegisSrv) *RegisHdr {
	return &RegisHdr{
		Rh: rs,
	}
}

// Regis godoc
// @Summary      Register new user
// @Description  Register a new user account
// @Tags         Regis
// @Accept       json
// @Produce      json
// @Param        request  body      model.Regis  true  "Register payload"
// @Success      200      {object}  dto.Res      "registration successful"
// @Failure      400      {object}  dto.Res      "password length error / bad request"
// @Failure      409      {object}  dto.Res      "user or email already exists"
// @Failure      500      {object}  dto.Res      "binding error / internal server error"
// @Router       /auth/regis [post]
func (r *RegisHdr) Regis(c *gin.Context) {
	newUser := model.Regis{}

	if e := c.ShouldBindBodyWithJSON(&newUser); e != nil {
		c.JSON(http.StatusInternalServerError, dto.Res{
			Status:  false,
			Message: cuserror.ErrBinding,
		})
		return
	}

	if e := r.Rh.RegisSrv(&newUser, c.Request.Context()); e != nil {
		if e == cuserror.LenPas {
			c.JSON(http.StatusBadRequest, dto.Res{
				Status:  false,
				Message: e.Error(),
			})
			return
		}

		if e == cuserror.ErrNoRowAffected {
			c.JSON(http.StatusInternalServerError, dto.Res{
				Status:  false,
				Message: e.Error(),
			})
			return
		}

		if e == cuserror.ErrIsExist {
			c.JSON(http.StatusConflict, dto.Res{
				Status:  false,
				Message: e.Error(),
			})
			return
		}

		if e == pgx.ErrNoRows {
			c.JSON(http.StatusInternalServerError, dto.Res{
				Status:  false,
				Message: e.Error(),
			})
		}
	}

	c.JSON(http.StatusOK, dto.Res{
		Status:  true,
		Message: "registration successful",
	})
}
