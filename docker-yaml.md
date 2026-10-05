# Docker Compose

Create a `.env` file in the same directory as your docker-compose.yml. Docker Compose automatically loads variables from `.env` and substitutes them using the ${VAR_NAME} syntax.

## 1. Create `.env`

```bash
# MongoDB Credentials
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=supersecretpassword

# Mongo Express Web UI Basic Auth
ME_BASICAUTH_USER=admin
ME_BASICAUTH_PASSWORD=websecretpassword
```

## 2. Updated `docker-compose.yml`

```bash
services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    restart: unless-stopped
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongo-data:/data/db
    networks:
      - mongo-network

  mongo-express:
    image: mongo-express:latest
    container_name: mongoexpress
    restart: unless-stopped
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_SERVER: mongodb
      ME_CONFIG_MONGODB_ADMINUSERNAME: admin
      ME_CONFIG_MONGODB_ADMINPASSWORD: password
      ME_CONFIG_BASICAUTH_USERNAME: admin
      ME_CONFIG_BASICAUTH_PASSWORD: password
    depends_on:
      - mongodb
    networks:
      - mongo-network

networks:
  mongo-network:
    driver: bridge

volumes:
  mongo-data:
    driver: local
```

## Usage Commands

- Start services in the background:

```bash
docker compose up -d
```

- Start services in the foreground with logs displayed in real time:

```bash
docker compose -f mongo.yaml up
```

- View live logs:

```bash
docker compose logs -f
```

- Stop and remove containers (preserving data volume):

```bash
docker compose down
```

- Stop and remove containers (preserving data volume) and remove data volume:

```bash
docker compose -f mongo.yaml down
```

- Stop and wipe everything (including database volume):

```bash
docker compose down -v
```
