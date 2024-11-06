const fs = require("fs");

fs.readFile("log.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  let array = data.split("\n");

  let totalNumber = array.length - 1;

  let win = 0,
    lose = 0,
    maxWin = 0,
    maxLose = 0,
    i = 0,
    j = 0;

  for (let key in array) {
    if (array[key] === "Win") {
      win++;
      i++;
    } else {
      if (i >= maxWin) {
        maxWin = i;
        i = 0;
      }
      i = 0;
    }

    if (array[key] === "Lose") {
      lose++;
      j++;
    } else {
      if (j >= maxLose) {
        maxLose = j;
        j = 0;
      }
      j = 0;
    }
  }

  console.log(`Общее количество партий: ${totalNumber}`);
  console.log(`Количество выигранных партий: ${win}`);
  console.log(`Количество проигранных партий: ${lose}`);
  console.log(`Соотношение партий: ${win} : ${lose}`);
  console.log(`Максимальне число побед подряд: ${maxWin}`);
  console.log(`Максимальне число проигрышей подряд: ${maxLose}`);
});
