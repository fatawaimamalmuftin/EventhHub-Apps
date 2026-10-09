package model

type CommunityDetail struct {
	ID          int     `json:"id" binding:"required,min=1"`
	Title       string  `json:"title"`
	Images      *string `json:"images"`
	Description *string `json:"description"`
	UserID      *int    `json:"user_id"`
	MemberCount int64   `json:"member_count"`
	CategoryIDs []int32 `json:"category_ids"`
}
