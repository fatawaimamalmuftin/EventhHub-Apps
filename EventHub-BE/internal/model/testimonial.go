package model

type Testimonial struct {
	ID       int     `json:"id"`
	Text     string  `json:"text"`
	UserID   int     `json:"user_id"`
	FullName string  `json:"full_name"`
	Profile  *string `json:"profile"`
	Job      *string `json:"job"`
}
