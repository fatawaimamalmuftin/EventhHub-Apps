package dto

import "time"

type CreateEvent struct {
	Title       string    `json:"title" binding:"required"`
	Images      string    `json:"images" binding:"required"`
	StartTime   time.Time `json:"start_time" binding:"required"`
	EndTime     time.Time `json:"end_time" binding:"required"`
	Location    string    `json:"location" binding:"required"`
	Capacity    int       `json:"capacity" binding:"required,min=1"`
	Description string    `json:"description" binding:"required"`
	EventFormat string    `json:"event_format" binding:"required"`
	CommunityID *int      `json:"community_id"`
	CategoryID  int       `json:"category_id" binding:"required,min=1"`

	SpeakerID   *int    `json:"speaker_id"`
	SpeakerName *string `json:"speaker_name"`
	PositionJob *string `json:"position_job"`
}
