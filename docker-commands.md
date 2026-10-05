# MongoDB & Mongo Express Docker Setup

A quick-reference guide to deploy a local MongoDB instance with the Mongo Express web management UI on a shared Docker bridge network.

## 1. Create a Shared Docker Network

Create an isolated bridge network so the containers can resolve each other by container name:

```bash
docker network create mongo-network
```

## 2. Start the MongoDB Container

Runs the official MongoDB image detached in the background with root credentials configured:

```bash
docker run -d
-p 27017:27017
-e MONGO_INITDB_ROOT_USERNAME=admin
-e MONGO_INITDB_ROOT_PASSWORD=password
--net mongo-network
--name mongodb
mongo
```

## 3. Start the Mongo Express Web UI

Connects Mongo Express to the `mongodb` service over `mongo-network` and exposes the web interface on port `8081`:

```bash
docker run -d
-p 8081:8081
-e ME_CONFIG_BASICAUTH_USERNAME=admin
-e ME_CONFIG_BASICAUTH_PASSWORD=password
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password
-e ME_CONFIG_MONGODB_SERVER=mongodb
--net mongo-network
--name mongoexpress
mongo-express
```
