export default class ShiftParser {
  #currentDay = null;

  constructor(json) {
    this.#currentDay = null;
    this.json = json;
  }

  parse = (val, row) => {
    if (this.#isDate(val)) {
      this.setDay(val);
    } else if (this.#isShift(val)) {
      this.loadShift(row, val);
    }
  };

  #isDate = (val) => {
    return /^(?=.*[a-zA-Z])(?=.*\d)[^-]+$/.test(val);
  };

  #isShift = (val) => {
    return /^(\d{1,2}:\d{2})-(\d{1,2}:\d{2})$/.test(val);
  };

  // day string: Nov 19, or anything not containing '-'
  setDay = (day) => {
    this.#currentDay = day;
  };

  // shift string: 10:00-12:00
  loadShift = (row, shift) => {
    const [start, end] = shift.split("-");
    const existing = this.json[this.#currentDay] ?? [];
    this.json[this.#currentDay] = [
      ...existing,
      {
        row,
        start,
        end,
      },
    ];
  };
}
