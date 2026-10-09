package repo

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbCommunityRepo struct {
	Db *pgxpool.Pool
}

func ProviderCommunityRepo(db *pgxpool.Pool) *DbCommunityRepo {
	return &DbCommunityRepo{
		Db: db,
	}
}

func (r *DbCommunityRepo) GetPopularCommunities(c context.Context) ([]model.PopularCommunity, error) {
	q := `
	SELECT
		c.id_community, c.title, c.images, c.description, COUNT(cm.users_id) AS member_count
	FROM community c
	LEFT JOIN community_members cm
		ON cm.community_id = c.id_community
	GROUP BY
		c.id_community, c.title, c.images, c.description
	ORDER BY member_count DESC
	LIMIT 10;`

	rows, err := r.Db.Query(c, q)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	communities := []model.PopularCommunity{}

	for rows.Next() {
		var community model.PopularCommunity

		err := rows.Scan(
			&community.ID, &community.Title, &community.Images, &community.Description, &community.MemberCount,
		)
		if err != nil {
			return nil, err
		}

		communities = append(communities, community)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return communities, nil
}
