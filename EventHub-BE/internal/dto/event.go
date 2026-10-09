package dto

type EventQuery struct {
	Search     string
	Categories []string
	Locations  []string
	Formats    []string
	SortBy     string
}
