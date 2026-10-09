package config

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/redis/go-redis/v9"
)

func RedisConfig() *redis.Client {
	host := os.Getenv("REDIS_HOST")
	port := os.Getenv("REDIS_PORT")
	username := os.Getenv("REDIS_USERNAME")
	password := os.Getenv("REDIS_PASSWORD")

	client := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%s", host, port),
		Username: username,
		Password: password,
	})

	if err := client.Ping(context.Background()).Err(); err != nil {
		log.Println("Gagal connect Redis:", err)
	} else {
		log.Println("Redis connected successfully")
	}

	return client
}
