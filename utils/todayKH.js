import moment, { locale } from "moment";

import voca from "voca";

const today = moment(new Date(), locale("km")).format("ll");
const todayWithDay = moment(new Date(), locale("km")).format("LLLL");
const day = voca(todayWithDay).chain().lowerCase().words().value();

export { day, today };
