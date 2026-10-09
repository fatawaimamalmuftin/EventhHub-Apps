package blacklist

import (
	"context"
	"time"

	"github.com/redis/go-redis/v9"
)

func AddToken(token string, rdb *redis.Client, c context.Context) error {
	key := "eventhub:token:" + token
	err := rdb.Set(c, key, "blacklisted", 15*time.Minute).Err()
	return err
}

func IsTokenBlackList(token string, rdb *redis.Client, c context.Context) (bool, error) {
	key := "eventhub:token:" + token

	err := rdb.Get(c, key).Err()

	if err == redis.Nil {
		return false, nil
	}

	if err != nil {
		return false, err
	}

	return true, nil
}
