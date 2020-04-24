"use strict";

const request = require("request");
const cheerio = require("cheerio");
let words = require("voca/words");

const scraping = () => {
  return request(
    "https://www.worldometers.info/coronavirus/country/cambodia/",
    (err, res, html) => {
      if (!err && res.statusCode == 200) {
        const $ = cheerio.load(html);

        const data = $(".maincounter-number");
        const arrayData = words(data.text());
        console.log(arrayData);

        let newData = [
          { cases: arrayData[0] },
          { deaths: arrayData[1] },
          { recoverd: arrayData[2] },
        ];

        console.log(JSON.stringify(newData));
      }
    }
  );
};

exports.default = scraping;
