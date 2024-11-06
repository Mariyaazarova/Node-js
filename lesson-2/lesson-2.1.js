const readline = require("readline");
const fs = require("fs");

//Подключаем чтение из консоли
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const arrayOptions = [
  ["1", "Орел"],
  ["2", "Решка"],
];

function start() {
  console.log("Введите 1 (Орел), 2 (Решка) или q (выход):");
}

start();

rl.on("line", function (line) {
  const rand = Math.floor(Math.random() * arrayOptions.length);

  if (line === "q") {
    this.close();
  } else {
    let string;
    if (line === "1" || line === "2" || line === "q") {
      console.log(`Вы выбрали: ${line}, рандомайзер: ${arrayOptions[rand][0]}`);
      if (line === arrayOptions[rand][0]) {
        console.log("Вы выиграли!");
        string = "Win\n";
      } else {
        console.log("Вы проиграли.");
        string = "Lose\n";
      }
      fs.appendFile("log.txt", string, function () {});
    } else {
      console.log("Ошибка!");
    }
    start();
  }
});
