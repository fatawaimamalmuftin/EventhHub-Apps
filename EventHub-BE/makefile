include ./.env

DB_URL=postgres://$(DB_USER):$(DB_PASSWORD)@$(DB_HOST):$(DB_PORT)/$(DB_DATA)?sslmode=disable
MIGRATION_PATH=db/migrations
SEEDER_PATH=db/seeding

migrate-up:
	migrate -database "$(DB_URL)" -path $(MIGRATION_PATH) up

migrate-down:
	migrate -database "$(DB_URL)" -path $(MIGRATION_PATH) down 1

migrate-down-all:
	migrate -database "$(DB_URL)" -path $(MIGRATION_PATH) down

migrate-force:
	migrate -database "$(DB_URL)" -path $(MIGRATION_PATH) force $(v)

migrate-version:
	migrate -database "$(DB_URL)" -path $(MIGRATION_PATH) version

migrate-create:
	migrate create -ext sql -dir $(MIGRATION_PATH) -seq create_$(nt)_table

seed-file:
	psql "$(DB_URL)" < "$(SEEDER_PATH)/$(n).sql"

seed-all:
	@for file in $(SEEDER_PATH)/*.sql; do \
		echo "Seeding $$file..."; \
		psql "$(DB_URL)" < "$$file" || exit 1; \
	done

seed-create:
	mkdir -p $(SEEDER_PATH)
	touch $(SEEDER_PATH)/$(shell printf "%06d" $$(find $(SEEDER_PATH) -name "*.sql" | wc -l | awk '{print $$1+1}'))_$(n).sql