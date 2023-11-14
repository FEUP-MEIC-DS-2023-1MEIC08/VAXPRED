# Builds 2 new containers with the frontend and backend code (build) and 
# starts both (up)
all:
	docker-compose build
	docker-compose up -d

# Stops the frontend and backend containers
stop:
	docker-compose stop

# Stops and runs the frontend and backend containers
re:
	docker-compose restart

# Lists all the running containers so far
ps:
	docker-compose ps

# Prevents the Makefile from logging the commands it's executing
.SILENT: