const fs = require("fs");
const minimist = require("minimist")(process.argv.slice(2));

let days = 3;
if (minimist.days) {
  days = minimist.days;
}

let currentDate = new Date();
let endDate = new Date();
endDate.setDate(currentDate.getDate() + days);

fs.readFile("birthday-events.json", (err, data) => {
  if (err) {
    console.error("err");
  }
  const dataJson = JSON.parse(data);
  dataJson.forEach((item) => {
    let birthdayEvents = new Date(item.date);
    const birthdayMonth = birthdayEvents.getMonth();
    const birthdayDay = birthdayEvents.getDate();
    const endtDay = endDate.getDate();
    const endMonth = endDate.getMonth();

    if (birthdayDay <= endtDay && birthdayMonth === endMonth) {
      console.log(
        ` "${item.date}" - свой день рождения празднует: ${item.name} `
      );
    }
  });
});
