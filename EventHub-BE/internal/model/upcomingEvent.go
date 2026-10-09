package model

import "time"

type UpcomingEvent struct {
	ID          int       `json:"id" binding:"required,min=1"`
	Title       string    `json:"title"`
	Images      string    `json:"images"`
	StartTime   time.Time `json:"start_time"`
	EndTime     time.Time `json:"end_time"`
	Location    string    `json:"location"`
	Attendees   int       `json:"attendees"`
	Capacity    int       `json:"capacity"`
	EventFormat string    `json:"event_format"`
}
