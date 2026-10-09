package cuserror

import "errors"

var InvalidEmail = errors.New("email is incorrect, does not contain @")
