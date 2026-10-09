package model

import "time"

type User struct {
	ID         int
	FullName   string
	Email      string
	Password   string
	Bio        *string
	Location   *string
	Profile    *string
	Job        *string
	Created_at time.Time
	Update_at  time.Time
}
