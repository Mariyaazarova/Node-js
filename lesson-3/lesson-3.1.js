//'Создать программу для получения информации о последних новостей с выбранного вами сайта в структурированном виде.'
const request = require("request");
const cheerio = require("cheerio");

const url = "https://bloknot-voronezh.ru/";

request(url, (err, response, body) => {
  if (!err && response.statusCode === 200) {
    const $ = cheerio.load(body);
    const countriesList = $(".thumbimage");
    countriesList.each((idx, item) => {
      console.log(idx + 1 + ".", $(item).next().text());
    });
  }
});
