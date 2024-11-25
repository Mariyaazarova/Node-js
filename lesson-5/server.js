const mysql = require("mysql2");

const request = require("request");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const consolidate = require("consolidate");

const app = express();

app.engine("hbs", consolidate.handlebars);
app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "views"));

app.use(bodyParser.json());

const Task = require("./models/task");
const { log } = require("handlebars/runtime");

app.get("/todo", (req, res) => {
  Task.getAll()
    .then((rows) => {
      return rows;
    })
    .then((rows) => {
      res.render("index.hbs", { name: rows });
    });
});

app.post("/todo", (req, res) => {
  Task.addTask(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      res.sendStatus(500);
    });
});

app.put("/todo", (req, res) => {
  Task.editTask(req.body)
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((e) => {
      res.sendStatus(500);
    });
});

app.delete("/todo/:id", (req, res) => {
  const id = req.params.id;
  Task.deleteTask(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((e) => {
      res.sendStatus(500);
    });
});

app.get("/todo/:query", (req, res) => {
  const search = req.params.query;

  Task.filterTask(search).then((rows) => {
    res.render("index.hbs", { name: rows });
  });
});
app.listen(3000);
