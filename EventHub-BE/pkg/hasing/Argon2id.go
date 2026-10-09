package hasing

import (
	"crypto/rand"
	"crypto/subtle"
	"encoding/base64"
	"fmt"
	"strings"

	cuserror "github.com/fatawaimamalmuftin/eventhub-be/internal/CusError"
	"golang.org/x/crypto/argon2"
)

type HashConfig struct {
	Memory uint32
	Time   uint32
	Thread uint8
	Key    uint32
	Salt   uint32
}

func GenerateHashConfig(
	memory,
	time,
	key,
	salt uint32,
	thread uint8,
) *HashConfig {
	return &HashConfig{
		Memory: memory,
		Time:   time,
		Thread: thread,
		Key:    key,
		Salt:   salt,
	}
}

func GenRecomConfHash() *HashConfig {
	return &HashConfig{
		Memory: 64 * 1024,
		Time:   2,
		Thread: 2,
		Key:    32,
		Salt:   16,
	}
}

func generateSalt(saltLen uint32) ([]byte, error) {
	salt := make([]byte, saltLen)

	_, err := rand.Read(salt)

	if err != nil {
		return nil, err
	}

	return salt, nil
}

func (h *HashConfig) GenPasHash(pass string) (string, error) {
	salt, err := generateSalt(h.Salt)

	if err != nil {
		return "", err
	}

	hash := argon2.IDKey(
		[]byte(pass), salt, h.Time, h.Memory, h.Thread, h.Key,
	)

	base64hash := base64.RawStdEncoding.EncodeToString(hash)
	base64salt := base64.RawStdEncoding.EncodeToString(salt)

	completeHash := fmt.Sprintf(
		"$argon2id$v=%d$m=%d, t=%d, p=%d$%s$%s",
		argon2.Version, h.Memory, h.Time, h.Thread, base64salt, base64hash,
	)

	return completeHash, nil
}

func ComparePassHash(pass, passFromdb string) error {
	result := strings.Split(passFromdb, "$")

	if len(result) < 6 {
		return cuserror.InvalidHash
	}

	if result[1] != "argon2id" {
		return cuserror.InternalError
	}

	var version int

	if _, e := fmt.Sscanf(result[2], "v=%d", &version); e != nil {
		return cuserror.InternalError
	}

	if version != argon2.Version {
		return cuserror.InternalError
	}

	var memory, time uint32
	var thread uint8

	if _, e := fmt.Sscanf(result[3], "m=%d, t=%d, p=%d", &memory, &time, &thread); e != nil {
		return cuserror.InternalError
	}

	salt, e := base64.RawStdEncoding.DecodeString(result[4])

	if e != nil {
		return cuserror.InternalError
	}

	hash, e := base64.RawStdEncoding.DecodeString(result[5])

	if e != nil {
		return cuserror.InternalError
	}

	newHash := argon2.IDKey([]byte(pass), salt, time, memory, thread, uint32(len(hash)))

	if subtle.ConstantTimeCompare(hash, newHash) == 0 {
		return cuserror.PasMissMach
	}

	return nil
}
