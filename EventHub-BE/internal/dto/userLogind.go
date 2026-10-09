package dto

import "time"

type UserLogind struct {
	FullName   string     `json:"full_name"`
	Email      string     `json:"email"`
	Bio        *string    `json:"bio"`
	Location   *string    `json:"location"`
	Profile    *string    `json:"profile"`
	Job        *string    `json:"job"`
	Created_at *time.Time `json:"created_at"`
}
