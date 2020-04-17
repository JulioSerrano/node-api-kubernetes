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

For automated test with mocha run:
```bash
docker-compose -f docker-compose.test.yml build
docker-compose -f docker-compose.test.yml up
```
The tests applied are: 
```bash
1 - Create person
2 - Get all persons
3 - Get one person with id 1
4 - Update a person with id 1
5 - Delete a person with id 1
6 - Create person with incorrect params
7 - Get one person with id 1 after deleted
8 - Delete a person with id 1 after deleted
```

Or test with link of apigee:
```bash
https://julioserrano-eval-test.apigee.net/people
```

Auth credentials, using Basic auth header:
```bash
user: admin
password: secret
```





