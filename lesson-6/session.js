const cookieParser = require("cookie-parser");
const session = require("cookie-session");

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const consolidate = require("consolidate");
const path = require("path");

const app = express();

app.engine("hbs", consolidate.handlebars);
app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({ keys: ["secret"] }));

const User = require("./models/user");
const { log } = require("handlebars/runtime");

app.use((req, res, next) => {
  if (req.session.user) {
    req.user = req.session.user;
  }
  next();
});

app.get("/auth", (req, res) => {
  res.render("auth");
});

app.post("/auth", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username, password }).then((user) => {
    if (!user) {
      res.redirect("/auth");
    } else {
      req.session.user = user;
      res.redirect("/users");
    }
  });
});

app.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/auth");
});

const mustbeAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth");
  }
};

app.all("/users", mustbeAuthenticated);
app.all("/users/*", mustbeAuthenticated);

app.get("/users", (req, res) => {
  res.send(req.user.username);
});

app.listen(3000);
