const express = require("express");
const bodyParser = require("body-parser");
const basicAuth = require('express-basic-auth')


const app = express();
const PORT = process.env.PORT || 3000;
const knex = require("./db/knex");

app.use(basicAuth({
  users: { 'admin': process.env.PASSWORD }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res.json("hello world!");
});

app.get("/people", (req, res) => {
  knex("persons")
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.json("Something went wrong.");
    });
});

app.get("/people/:id", (req, res) => {
  knex("persons")
    .where({ id: parseInt(req.params.id) })
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.json("Something went wrong.");
    });
});

app.post("/people", (req, res) => {
  knex("persons")
    .insert({
      rut: req.body.rut,
      age: req.body.age,
      name: req.body.name,
      course: req.body.course,
      lastName: req.body.lastName,
    })
    .then(() => {
      res.status(201).json("Person added!");
    })
    .catch(() => {
      res.json("Something went wrong.");
    });
});

app.put("/people/:id", (req, res) => {
  knex("persons")
    .where({ id: parseInt(req.params.id) })
    .update({
      rut: req.body.rut,
      age: req.body.age,
      name: req.body.name,
      course: req.body.course,
      lastName: req.body.lastName,
    })
    .then(() => {
      res.json("Person updated!");
    })
    .catch(() => {
      res.json("Something went wrong.");
    });
});

app.delete("/people/:id", (req, res) => {
  knex("persons")
    .where({ id: parseInt(req.params.id) })
    .del()
    .then(() => {
      res.json("Person deleted!");
    })
    .catch(() => {
      res.json("Something went wrong.");
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
