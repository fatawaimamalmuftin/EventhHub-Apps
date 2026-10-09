package main

import (
	"context"
	"fmt"
	"log"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/config"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/router"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

// @title						EventHub BE
// @version						1.0
// @description					This is a sample server celler server.

// @host						localhost:5678
// @BasePath					/

// @securityDefinitions.apikey	BasicAuth
// @in							header
// @name						Authorization
// @deskription					Bearer token identity
func main() {
	err := godotenv.Load()

	if err != nil {
		log.Println("failed to load .env")
	}

	r := gin.Default()

	r.Static("/uploads", "./public/uploads")

	db, err := config.DBconfig()
	if err != nil {
		fmt.Println(err)
	}

	rdb := config.RedisConfig()
	log.Println("status Redis", rdb)
	defer rdb.Close()

	ctx := context.Background()
	router.MainRouter(r, db, rdb, &ctx)

	r.Run(":5678")
}
