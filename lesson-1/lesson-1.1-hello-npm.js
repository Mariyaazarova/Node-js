//1) Установить Node.js и запустить примеры из урока: hello-npm.js

const ansi = require("ansi");
const cursor = ansi(process.stdout);
console.log("Hello, World!");
cursor.beep();
