package cuserror

import "errors"

var ErrMissingKey = errors.New("jwt key not found")
