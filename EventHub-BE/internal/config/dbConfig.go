package config

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func DBconfig() (*pgxpool.Pool, error) {

	user := os.Getenv("DB_USER")
	pass := os.Getenv("DB_PASSWORD")
	source := os.Getenv("DB_DATA")
	dbPort := os.Getenv("DB_PORT")
	dbHost := os.Getenv("DB_HOST")

	connect := "postgres://" + user + ":" + pass + "@" + dbHost + ":" + dbPort + "/" + source

	db, err := pgxpool.New(context.Background(), connect)

	if err != nil {
		log.Println("gagal connect :", err)
		return nil, err
	}

	if db != nil {
		if err := db.Ping(context.Background()); err != nil {
			log.Println("gagal ping database:", err)
			return nil, err
		}
		log.Println("connected database")
	}

	return db, nil
}
