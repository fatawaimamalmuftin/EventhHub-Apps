package handler

import (
	"mime/multipart"
	"net/http"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	jwtpkg "github.com/fatawaimamalmuftin/eventhub-be/pkg/jwt"
	"github.com/gin-gonic/gin"
)

type IChangeUserProfile interface {
	ChangeUserProfileSrv(userID int, data dto.ChangeUserProfile, profile *multipart.FileHeader) (string, error)
}

type ChangeUserProfileHdrS struct {
	CUPs IChangeUserProfile
}

func ChangeUserProfileHandler(cups IChangeUserProfile) *ChangeUserProfileHdrS {
	return &ChangeUserProfileHdrS{
		CUPs: cups,
	}
}

// ChangeUserProfileHdr godoc
// @Summary      Change user profile
// @Description  Update user profile details for the authenticated user
// @Tags         Change User Profile
// @Accept       multipart/form-data
// @Produce      json
// @Security     BasicAuth
// @Param        bio       formData string false "User bio"
// @Param        location  formData string false "User location"
// @Param        job       formData string false "User job"
// @Param        profile   formData file false "Profile image"
// @Success      200      {object}  dto.Res{data=string}   "profile updated successfully"
// @Failure      400      {object}  dto.Res                "bad request error message"
// @Failure      401      {object}  dto.Res                "invalid token"
// @Failure      500      {object}  dto.Res                "internal server error"
// @Router       /events/changeuserprofile [patch]
func (c *ChangeUserProfileHdrS) ChangeUserProfileHdr(ctx *gin.Context) {
	var userProfile dto.ChangeUserProfile

	if err := ctx.ShouldBind(&userProfile); err != nil {
		ctx.JSON(http.StatusBadRequest, dto.Res{
			Status:  false,
			Message: err.Error(),
		})
		return
	}

	file, err := ctx.FormFile("profile")

	if err != nil {
		file = nil
	}

	tokenClaims, exists := ctx.Get("tokenCleims")

	if !exists {
		ctx.JSON(http.StatusUnauthorized, dto.Res{
			Status:  false,
			Message: "invalid token",
		})
		return
	}

	claims, ok := tokenClaims.(jwtpkg.JWTclem)

	if !ok {
		ctx.JSON(http.StatusInternalServerError, dto.Res{
			Status:  false,
			Message: "internal server error",
		})
		return
	}

	profilePath, err := c.CUPs.ChangeUserProfileSrv(
		claims.Id,
		userProfile,
		file,
	)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dto.Res{
			Status:  false,
			Message: "internal server error",
		})
		return
	}

	ctx.JSON(http.StatusOK, dto.Res{
		Status:  true,
		Message: "profile updated successfully",
		Data:    profilePath,
	})
}
