package middleware

import (
	"errors"
	"net/http"
	"strings"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/fatawaimamalmuftin/eventhub-be/pkg/blacklist"
	jwtpkg "github.com/fatawaimamalmuftin/eventhub-be/pkg/jwt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/redis/go-redis/v9"
)

func CheckJWTtoken(c *gin.Context, rdb *redis.Client) {
	autorizationhHeader := c.GetHeader("Authorization")

	if autorizationhHeader == "" {
		c.AbortWithStatusJSON(http.StatusUnauthorized, dto.Res{
			Status:  false,
			Message: "please login first",
		})
		return
	}

	bearer := strings.Split(autorizationhHeader, " ")

	if len(bearer) != 2 {
		c.AbortWithStatusJSON(http.StatusUnauthorized, dto.Res{
			Status:  false,
			Message: "invalid bearer token",
		})
		return
	}

	if bearer[0] != "Bearer" {
		c.AbortWithStatusJSON(http.StatusUnauthorized, dto.Res{
			Status:  false,
			Message: "invalid bearer token",
		})
		return
	}

	var tokenClem jwtpkg.JWTclem

	err := tokenClem.DecodeToken(bearer[1])

	if err != nil {
		if errors.Is(err, jwt.ErrTokenInvalidIssuer) || errors.Is(err, jwt.ErrTokenExpired) {
			c.AbortWithStatusJSON(http.StatusUnauthorized, dto.Res{
				Status:  false,
				Message: "invalid token",
			})
			return
		}

		c.AbortWithStatusJSON(http.StatusInternalServerError, dto.Res{
			Status:  false,
			Message: "internal server error",
		})
		return
	}

	isBlacklisted, err := blacklist.IsTokenBlackList(bearer[1], rdb, c.Request.Context())

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, dto.Res{
			Status:  false,
			Message: "internal server error",
		})
		return
	}

	if isBlacklisted {
		c.AbortWithStatusJSON(http.StatusUnauthorized, dto.Res{
			Status:  false,
			Message: "invalid token",
		})
		return
	}

	c.Set("tokenCleims", tokenClem)
	c.Next()
}
