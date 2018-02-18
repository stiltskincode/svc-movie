all:
	docker-compose down
	docker-compose rm -f
	docker-compose -f docker-compose.yml up --build -d --remove-orphans ${COMPOSE_BUILD_OPT}

run:
	docker-compose run --service-ports -d web-server node app.js

run_test:
	docker-compose run --service-ports web-server npm test