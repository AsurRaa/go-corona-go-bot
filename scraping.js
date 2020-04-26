"use strict";
import request from "request";
import cheerio from "cheerio";
import words from "voca/words";

const scraping = async (country) => {
  const getScraping = request(
    `https://www.worldometers.info/coronavirus/country/${country}/`,
    (err, res, html) => {
      if (!err && res.statusCode == 200) {
        const $ = cheerio.load(html);

        let hook = $(".maincounter-number");
        const arrayData = words(hook.text());

      }
    }
  );
  


export default scraping;
