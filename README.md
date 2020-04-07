# node-api-kubernetes

Is a node js api using knex framework and deploy with docker and kubernetes in GCP.

## Local installation

Create image
```bash
docker-compose build
```

Run image and see logs
```bash
docker-compose up
```

Run image in background
```bash
docker-compose -d up
```

Run the migrations with knex:
```bash
docker-compose exec web knex migrate:latest
```

Test api in:

```bash
GET localhost:3000/people
PUT localhost:3000/people/:id
POST localhost:3000/people
DELETE localhost:3000/people/:id
```
Or visit link in apigee:
```bash
https://julioserrano-eval-test.apigee.net/people
```


Auth credentials, using Basic auth header:

```bash
user: admin
password: secret
```
