package model

import "time"

type MyNotif struct {
	Id_notif int       `json:"id_notif" binding:"required,min=1"`
	Title    string    `json:"title"`
	Desk     string    `json:"desk"`
	Time     time.Time `json:"time"`
	Type     string    `json:"type"`
	Read_at  time.Time `json:"read_at"`
}
