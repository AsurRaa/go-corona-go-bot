"use strict";
import axios from "axios";
import cheerio from "cheerio";
import words from "voca/words";

const scarping = async () => {
  let data = await [];
  await axios
    .get("https://www.worldometers.info/coronavirus/country/cambodia/")
    .then((res) => {
      // console.log(res.data);
      const html = res.data;
      const $ = cheerio.load(html);
      let hook = $(".maincounter-number");
      const arrayData = words(hook.text());
      data.push({
        cases: arrayData[0],
        dies: arrayData[1],
        recovered: arrayData[2],
      });
    })
    .catch((err) => console.log("render err", err));
  console.log("data", data);
  return data;
};

console.log(scarping());
