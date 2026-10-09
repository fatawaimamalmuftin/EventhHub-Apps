package dto

type CreateTestimonial struct {
	Text string `json:"text" binding:"required"`
}
