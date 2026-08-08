DOCKER_PATH := .

build: # build containers
	@cd $(DOCKER_PATH) && docker compose build

up:
	@cd $(DOCKER_PATH) && docker compose up -d

start: # start containers
	@cd $(DOCKER_PATH) && docker compose start

stop: # stop containers
	@cd $(DOCKER_PATH) && docker compose stop

logs:
	@cd $(DOCKER_PATH) && docker compose logs

restart: stop start

down: # down all data
	@echo "This command will delete all data. Do you want to continue? (print 'yes' for continue): "
	@read accept; \
	if [ $$accept = "yes" ]; \
	then cd $(DOCKER_PATH) && docker compose down -v --remove-orphans; \
	else echo aborting; fi

#
# Container console
#
console/nginx:
	docker compose exec nginx sh

console/php-fpm:
	docker compose exec -u www-data php-fpm bash

console/mysql:
	docker compose exec -u mysql mysql bash

nginx/reload: # reload nginx config instead of restart container
	docker compose exec nginx sh -c "nginx -s reload"
