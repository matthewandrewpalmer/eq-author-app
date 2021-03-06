const NUMBER = "Number";
const CURRENCY = "Currency";
const UNIT = "Unit";
const PERCENTAGE = "Percentage";
const DATE = "Date";
const DATE_RANGE = "DateRange";
const TEXTAREA = "TextArea";
const TEXTFIELD = "TextField";
const RADIO = "Radio";
const CHECKBOX = "Checkbox";
const DURATION = "Duration";

const BASIC_ANSWERS = [NUMBER, CURRENCY, UNIT, DURATION, TEXTAREA, TEXTFIELD];
const NON_RADIO_ANSWERS = [
  ...BASIC_ANSWERS,
  PERCENTAGE,
  DATE,
  DATE_RANGE,
  CHECKBOX,
];

module.exports = {
  NUMBER,
  CURRENCY,
  UNIT,
  PERCENTAGE,
  DURATION,
  DATE,
  DATE_RANGE,
  TEXTAREA,
  TEXTFIELD,
  RADIO,
  CHECKBOX,
  BASIC_ANSWERS,
  NON_RADIO_ANSWERS,
};
