package dto

type Account struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type ChangeUserProfile struct {
	Bio      *string `form:"bio"`
	Location *string `form:"location"`
	Job      *string `form:"job"`
	// Profile  *string `json:"profile"`
}
