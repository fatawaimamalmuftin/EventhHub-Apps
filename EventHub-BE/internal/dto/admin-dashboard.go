package dto

type AdminDashboardResponse struct {
	TotalUsers       uint8   `json:"total_users"`
	TotalEvents      uint8   `json:"total_events"`
	TotalCommunities uint8   `json:"total_communities"`
	AvgFillRate      float32 `json:"avg_fill_rate"`
}
