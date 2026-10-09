package service

import (
	"context"

	"github.com/fatawaimamalmuftin/eventhub-be/pkg/blacklist"
	"github.com/redis/go-redis/v9"
)

type LogoutSrvS struct {
	Rdb *redis.Client
}

func LogoutService(rdb *redis.Client, c *context.Context) *LogoutSrvS {
	return &LogoutSrvS{
		Rdb: rdb,
	}
}

func (l *LogoutSrvS) Logout(token string, c context.Context) error {
	blacklist.AddToken(token, l.Rdb, c)
	return nil
}
