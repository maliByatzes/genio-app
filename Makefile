
up:
	docker compose up -d
	sleep 3

down:
	docker compose down

start:
	docker compose start

stop:
	docker compose stop

reset:
	docker compose down
	make up

.PHONY: up down start stop reset
