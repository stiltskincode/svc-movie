all: clean
	
clean: down
	docker-compose rm -f

down:
	docker-compose down

run: down
	docker-compose run --service-ports -d web-server node app.js

run_test: down
	docker-compose run --service-ports web-server npm test