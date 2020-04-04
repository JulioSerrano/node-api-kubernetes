const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3000;
const knex = require('./db/knex');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json('pong!');
});

app.get('/persons', (req, res) => {
  knex('persons')
  .then((data) => { res.json(data); })
  .catch(() => { res.json('Something went wrong.') });
});

app.get('/persons/:id', (req, res) => {
  knex('persons')
  .where({ id:  parseInt(req.params.id) })
  .then((data) => { res.json(data); })
  .catch(() => { res.json('Something went wrong.') });
});

app.post('/persons', (req, res) => {
  knex('persons')
  .insert({
    title: req.body.title,
    completed: false
  })
  .then(() => { res.json('Person added!'); })
  .catch(() => { res.json('Something went wrong.') });
});

app.put('/persons/:id', (req, res) => {
  knex('persons')
  .where({ id: parseInt(req.params.id) })
  .update({
    title: req.body.title,
    completed: req.body.completed
  })
  .then(() => { res.json('Person updated!'); })
  .catch(() => { res.json('Something went wrong.') });
});

app.delete('/persons/:id', (req, res) => {
  knex('persons')
  .where({ id: parseInt(req.params.id) })
  .del()
  .then(() => { res.json('Person deleted!'); })
  .catch(() => { res.json('Something went wrong.') });
});


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});