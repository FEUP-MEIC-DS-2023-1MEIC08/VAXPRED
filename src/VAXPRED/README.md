# VAXPRED

## Deployment with Docker

Requires Docker and Docker Compose.

```bash
docker-compose build
docker-compose up -d
docker-compose ps # check if running
```

## Local Development

### Frontend

Run `npm install` to install dependencies.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Backend

Run `cd ./api` to change directory to the backend.

Run `pip install -r requirements.txt` to install dependencies.

Run `uvicorn main:app` to start the backend server.

Run `pytest` to run the tests.
