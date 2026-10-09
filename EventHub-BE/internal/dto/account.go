package dto

type Account struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type ChangeUserProfile struct {
	Bio      *string `json:"bio"`
	Location *string `json:"location"`
	Job      *string `json:"job"`
	// Profile  *string `json:"profile"`
}
