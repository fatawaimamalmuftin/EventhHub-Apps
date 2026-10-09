package service

import (
	"context"
	"errors"
	"strings"

	cuserror "github.com/fatawaimamalmuftin/eventhub-be/internal/CusError"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/model"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
	"github.com/fatawaimamalmuftin/eventhub-be/pkg/hasing"
	"github.com/jackc/pgx/v5"
)

type RegisSrvS struct {
	Rs *repo.DbRegisRepo
}

func RegisService(rp *repo.DbRegisRepo) *RegisSrvS {
	return &RegisSrvS{
		Rs: rp,
	}
}

func (r *RegisSrvS) RegisSrv(newUser *model.Regis, c context.Context) error {
	if len(newUser.Password) < 6 {
		return cuserror.LenPas
	}

	if !strings.Contains(newUser.Email, "@") {
		return cuserror.InvalidEmail
	}

	id, err := r.Rs.IsExist(c, *newUser)

	if err != nil && !errors.Is(err, pgx.ErrNoRows) {
		return err
	}

	if id > 0 {
		return cuserror.ErrIsExist
	}

	hashConf := hasing.GenRecomConfHash()

	hashed, err := hashConf.GenPasHash(newUser.Password)

	if err != nil {
		return err
	}

	newUser.Password = hashed

	if e := r.Rs.NewAccount(c, *newUser); e != nil {
		return e
	}

	return nil
}
