package model

type PopularCommunity struct {
	ID          int     `json:"id"`
	Title       string  `json:"title"`
	Images      *string `json:"images"`
	Description *string `json:"description"`
	MemberCount int64   `json:"member_count"`
}
