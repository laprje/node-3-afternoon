require("dotenv").config();
const express = require("express");
const massive = require("massive");
const ctrl = require("./products_controller");

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING)
  .then(databaseConnection => {
    app.set("db", databaseConnection);
  })
  .catch(err => console.log(err));

app.use(express.json());

app.post('/api/products', ctrl.create);
app.get('/api/products', ctrl.getAll);
app.get('/api/products/:id', ctrl.getOne);
app.put('/api/products/:id', ctrl.update);
app.delete('/api/products/:id', ctrl.delete);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}.`);
});