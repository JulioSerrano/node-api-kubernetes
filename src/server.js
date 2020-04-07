const express = require("express");
const bodyParser = require("body-parser");
const basicAuth = require('express-basic-auth')


const app = express();
const PORT = process.env.PORT || 3000;
const knex = require("./db/knex");

app.use(basicAuth({
  users: { 'admin': 'supersecret' }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res.json("pong!");
});

app.get("/persons", (req, res) => {
  knex("persons")
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.json("Something went wrong.");
    });
});

app.get("/persons/:id", (req, res) => {
  knex("persons")
    .where({ id: parseInt(req.params.id) })
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.json("Something went wrong.");
    });
});

app.post("/persons", (req, res) => {
  knex("persons")
    .insert({
      rut: req.body.rut,
      age: req.body.age,
      name: req.body.name,
      course: req.body.course,
      lastName: req.body.lastName,
    })
    .then(() => {
      res.json("Person added!");
    })
    .catch(() => {
      res.json("Something went wrong.");
    });
});

app.put("/persons/:id", (req, res) => {
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

app.delete("/persons/:id", (req, res) => {
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
