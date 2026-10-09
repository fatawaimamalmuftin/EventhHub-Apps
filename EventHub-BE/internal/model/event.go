package model

import "time"

type Event struct {
	ID             int       `json:"id"`
	Title          string    `json:"title"`
	Images         string    `json:"images"`
	StartTime      time.Time `json:"start_time"`
	EndTime        time.Time `json:"end_time"`
	Location       string    `json:"location"`
	Attendees      int       `json:"attendees"`
	Capacity       int       `json:"capacity"`
	Description    string    `json:"description"`
	EventFormat    string    `json:"event_format"`
	CommunityID    int       `json:"community_id"`
	CommunityTitle string    `json:"community_title"`
	Categories     []string  `json:"categories"`
}
