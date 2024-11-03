//2) Создать простейшую консольную программу с использованием хотя бы одной функции из стороннего модуля, локально установленного с помощью NPM (модуль должен отличаться от рассмотренного на уроке!).

const wrap = require("word-wrap");

console.log(
  wrap(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  )
);
