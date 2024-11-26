const { log } = require("handlebars");
const mysql = require("mysql2");
const config = require("../config");
const { response } = require("express");

const pool = mysql.createPool(config);

class Task {
  static getAll() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);

        connection.query("SELECT * FROM tasks", (err, rows) => {
          connection.release();
          if (err) {
            reject(err);
          }
          resolve(rows);
        });
      });
    });
  }

  static addTask(task) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);

        const { nameTask, startTask, endTask, controlTask } = task;
        connection.query(
          "INSERT INTO tasks (nameTask, startTask, endTask, controlTask) VALUES (?, ?, ?, ?)",
          [nameTask, startTask, endTask, controlTask],
          (err, result) => {
            if (err) {
              connection.release();
              reject(err);
            }
            connection.query(
              `SELECT * FROM tasks WHERE ID=${result.insertId}`,
              (err, rows) => {
                connection.release();
                if (err) reject(err);
                resolve(rows[0]);
              }
            );
          }
        );
      });
    });
  }

  static editTask(task) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);

        const { nameTask, startTask, endTask, controlTask, id } = task;
        connection.query(
          "UPDATE tasks SET nameTask = ?, startTask = ?,  endTask = ?, controlTask = ? WHERE id = ?",
          [nameTask, startTask, endTask, controlTask, id],
          (err, result) => {
            connection.release();
            if (err) reject(err);

            connection.query(
              `SELECT * FROM tasks WHERE ID=${id}`,
              (err, rows) => {
                connection.release();
                if (err) reject(err);
                resolve(rows);
              }
            );
          }
        );
      });
    });
  }

  static deleteTask(id) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);

        connection.query("DELETE FROM tasks WHERE id= ?", [id], (err) => {
          connection.release();
          if (err) {
            reject(err);
          }
          resolve();
        });
      });
    });
  }

  static filterTask(search) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);

        connection.query(
          "SELECT * FROM tasks WHERE controlTask=?  ",
          [search],
          (err, rows) => {
            connection.release();
            if (err) {
              reject(err);
            }
            resolve(rows);
          }
        );
      });
    });
  }
}

module.exports = Task;
