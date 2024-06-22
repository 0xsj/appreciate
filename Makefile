dev:
	docker-compose build && docker-compose up
up:
	docker-compose -f docker-compose.yml up -d
down:
	docker-compose down --remove-orphans
protoc-grpc-rss:
	rss/scripts/protoc.sh
protoc-grpc-pub:
	publisher/scripts/protoc.sh