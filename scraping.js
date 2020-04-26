"use strict";
import axios from "axios";
import cheerio from "cheerio";
import words from "voca/words";

const scarping = async (country) => {
  let data = [];
  await axios
    .get(`https://www.worldometers.info/coronavirus/country/${country}/`)
    .then((res) => {
      const html = res.data;
      const $ = cheerio.load(html);
      let hook = $(".maincounter-number");
      const arrayData = words(hook.text());
      return data.push(
        {
          cases: arrayData[0],
        },
        { dies: arrayData[1] },
        { recovered: arrayData[2] }
      );
    })
    .catch((err) => console.log("render err", err));
  return data;
};

async function run(country) {
  const result = await scarping(country);
  return result;
}
export default run;
