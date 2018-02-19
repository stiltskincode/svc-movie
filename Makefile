all:
	docker-compose down
	docker-compose rm -f

run:
	docker-compose run --service-ports -d web-server node app.js

run_test:
	docker-compose run --service-ports web-server npm test