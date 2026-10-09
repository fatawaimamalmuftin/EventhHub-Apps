package repo

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DbCommunityDetailRepo struct {
	Db *pgxpool.Pool
}

func ProviderCommunityDetailRepo(db *pgxpool.Pool) *DbCommunityDetailRepo {
	return &DbCommunityDetailRepo{
		Db: db,
	}
}

func (r *DbCommunityDetailRepo) GetCommunityDetail(id int, c context.Context) (model.CommunityDetail, error) {
	q := `
	SELECT
		c.id_community, c.title, c.images, c.description, c.users_id,
		COALESCE(
			ARRAY_AGG(DISTINCT cc.category_id)
			FILTER (WHERE cc.category_id IS NOT NULL),
			ARRAY[]::INT[]
		) AS category_ids,
		COUNT(DISTINCT cm.users_id) AS member_count
	FROM community c

	LEFT JOIN community_categories cc
		ON cc.community_id = c.id_community

	LEFT JOIN community_members cm
		ON cm.community_id = c.id_community

	WHERE c.id_community = $1

	GROUP BY
		c.id_community, c.title, c.images, c.description, c.users_id;`

	var community model.CommunityDetail

	err := r.Db.QueryRow(c, q, id).Scan(
		&community.ID, &community.Title, &community.Images, &community.Description, &community.UserID, &community.CategoryIDs, &community.MemberCount,
	)

	if err != nil {
		return model.CommunityDetail{}, err
	}

	return community, nil
}
