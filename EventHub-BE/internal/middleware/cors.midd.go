package middleware

import (
	"net/http"
	"slices"

	"github.com/gin-gonic/gin"
)

func Cors(c *gin.Context) {
	origin := []string{"http://localhost:1234"}

	if slices.Contains(origin, c.GetHeader("Origin")) {
		c.Header("Access-Control-Allow-Origin", c.GetHeader("Origin"))
	}

	c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
	c.Header("Access-Control-Allow-Headers", "Content-Type")

	if c.Request.Method == http.MethodOptions {
		c.AbortWithStatus(http.StatusNoContent)
		return
	}

	c.Next()
}
