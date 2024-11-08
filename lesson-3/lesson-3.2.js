// Получить прогноз погоды в Воронеже на 5 дней

const request = require("request");

const args = require("yargs").argv;
/* console.log(args);
console.log(`Language : ${args.language}`);
console.log(`IDE : : ${args.ide}`);
console.log(args._[0]);
console.log(args._[1]); */

let lat = args._[0];
let long = args._[1];
let apiKey = "76b572d209e178d305f1a4946cc92f21";

const forecast = function (lat, long) {
  let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric&lang=ru`;

  request({ url: url, json: true }, function (err, response) {
    if (err) {
      console.log("Невозможно подключиться к API прогноза");
    } else {
      let resultArray = response.body.list;
      for (let data of resultArray) {
        let resultDescription = data.weather[0].description;

        console.log(`
          Дата:${data.dt_txt}.
          Температура: ${data.main.temp} .
          Максимальная температура: ${data.main.temp_max} .
          Минимальная температура: ${data.main.temp_min} .
          Влажность: ${data.main.humidity} %.
          Характеристика: ${resultDescription}.
        `);
      }
    }
  });
};

forecast(lat, long);

//node lesson-3.2.js --language=javascript --ide=GFG_IDE 53.9 27.5667 --b --v (US)
//node lesson-3.2.js --language=javascript --ide=GFG_IDE 51.6664 39.17 --b --v (Воронеж)
//"lat": 53.9, "long" : 27.5667 - Минск
//"lat": 34.0901, "long": -118.4065 - US
//"lat": 51.6664 , "long" 39.17:  - Воронеж
