"use strict";
import request from "request";
import cheerio from "cheerio";
import words from "voca/words";

const scraping = (country) => {
  let data = [];
  request(
    `https://www.worldometers.info/coronavirus/country/${country}/`,
    (err, res, html) => {
      if (!err && res.statusCode == 200) {
        const $ = cheerio.load(html);

        let hook = $(".maincounter-number");
        const arrayData = words(hook.text());

        data[0] = { cases: arrayData[0] };
        data[1] = { deaths: arrayData[1] };
        data[2] = { recoverd: arrayData[2] };

        console.log("retrive data", arrayData);
        console.log("arraay", data);
      }
    }
  );
  return data;
};

export default scraping;
