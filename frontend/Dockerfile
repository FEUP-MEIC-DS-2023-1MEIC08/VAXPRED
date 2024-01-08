# frontend Dockerfile
FROM node:16 AS builder
WORKDIR /app

# Copy the rest of the application code
COPY . .

RUN npm install

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]
