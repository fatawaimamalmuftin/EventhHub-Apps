FROM golang:1.27.1 AS builder

WORKDIR /app

COPY go.sum go.mod ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o ./be-golang ./cmd/main.go

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/be-golang ./be-golang

CMD ["/app/be-golang"]