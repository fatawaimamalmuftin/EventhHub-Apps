package model

type UserProfile struct {
	ID       int     `json:"id" binding:"required,min=1"`
	FullName string  `json:"full_name"`
	Email    string  `json:"email"`
	Bio      *string `json:"bio"`
	Location *string  `json:"location"`
	Profile  *string  `json:"profile"`
	Job      *string  `json:"job"`
}
