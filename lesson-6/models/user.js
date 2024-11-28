const { log } = require("handlebars");
const mysql = require("mysql2");
const config = require("../config");
const { response } = require("express");

const pool = mysql.createPool(config);

class User {
  static findOne({ username, password }) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);

        connection.query(
          "SELECT * FROM users WHERE username = ? AND password = ?",
          [username, password],
          (err, user) => {
            connection.release();
            if (err) reject(err);

            resolve(user[0]);
          }
        );
      });
    });
  }
}

module.exports = User;

// Данные в БД / username: username-1, password: 123qwe.
