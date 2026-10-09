package service

import (
	"context"
	"errors"
	"strings"

	cuserror "github.com/fatawaimamalmuftin/eventhub-be/internal/CusError"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/dto"
	"github.com/fatawaimamalmuftin/eventhub-be/internal/repo"
	"github.com/fatawaimamalmuftin/eventhub-be/pkg/hasing"
	jwtpkg "github.com/fatawaimamalmuftin/eventhub-be/pkg/jwt"
	"github.com/jackc/pgx/v5"
)

type LoginSrvS struct {
	Lr *repo.DbLoginRepo
}

func LoginService(lr *repo.DbLoginRepo) *LoginSrvS {
	return &LoginSrvS{
		Lr: lr,
	}
}

func (l *LoginSrvS) LoginSrv(c context.Context, logind *dto.Account) (string, dto.UserLogind, error) {
	if len(logind.Password) < 6 {
		return "", dto.UserLogind{}, cuserror.LenPas
	}

	if !strings.Contains(logind.Email, "@") {
		return "", dto.UserLogind{}, cuserror.InvalidEmail
	}

	data, err := l.Lr.GetUserByEmail(logind.Email, c)

	user := dto.UserLogind{
		FullName:   data.FullName,
		Email:      data.Email,
		Bio:        data.Bio,
		Location:   data.Location,
		Profile:    data.Profile,
		Job:        data.Job,
		Created_at: &data.Created_at,
	}

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return "", dto.UserLogind{}, cuserror.InvalidCredential
		}
		return "", dto.UserLogind{}, cuserror.InternalError
	}

	if e := hasing.ComparePassHash(logind.Password, data.Password); e != nil {
		if errors.Is(e, cuserror.PasMissMach) {
			return "", dto.UserLogind{}, cuserror.InvalidCredential
		}
		return "", dto.UserLogind{}, e
	}

	// plan handler role for admin, organizer and user

	// make token
	claims := jwtpkg.NewJWTclem(data.ID, "")

	token, err := claims.GenToken()

	if err != nil {
		return "", dto.UserLogind{}, cuserror.InternalError
	}

	return token, user, nil
}
