/* 3) Продвинутый блок: создать с помощью Node.js API консольную
программу, которая будет выводить что-либо в консоль разными
цветами и издавать звук(и) с помощью модуля или модулей,
отличных от рассмотренного на уроке.* */

const colors = require("@larchanka/colors-js");
const beep = require("@xch/beepbeep");
beep();
console.log(colors.red("Это сообщение имеет красный цвет!"));
beep();
console.log(colors.yellow("Это сообщение имеет желтый цвет!"));
beep();
console.log(colors.bgPink("Это сообщение на розовом фоне белым текстом!"));
