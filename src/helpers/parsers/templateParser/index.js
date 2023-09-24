const XLSX = require("xlsx");

export default class ScheduleTemplateParser {
  SHIFT_COLUMN = 'A';
  PEOPLE_NEEDED_COLUMN = 'B';
  UNAVAILABLILITY_COLUMN = 'C';

  #worksheet = null;
  #output = null;

  constructor(file) {
    this.file = file;
    this.#worksheet = null;
    this.#output = {};
  }

  readFile = async () => {
    if (!this.file) {
      throw new Error('No file provided');
    }
  
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      this.#worksheet = workbook.Sheets[sheetName];
    };

    await new Promise((resolve) => {
      reader.readAsArrayBuffer(this.file);
      reader.onloadend = () => {
        resolve();
      };
    });
  };

  compile = () => {
    this.parseColumn(this.SHIFT_COLUMN);
  }

  print = () => {
    console.log(this.#output);
  }

  // bad complexity, bad way to set return value
  parseColumn = (column) => {
    const parser = this.#getParser(column);
    for (let entry in this.#worksheet) {
      const entryColumn = entry.toString()[0];
      const entryRow = entry.toString().slice(1);
      if (entryColumn === column) {
        parser.parse(this.parseEntry(this.#worksheet[entry]), entryRow);
      } else {
        continue;
      }
    }
    this.#output = parser.json;
  }

  parseEntry = (content, usingProvidedType = false) => {
    const val = usingProvidedType ? content['v'] : content['w'];
    const type = content['t'];
    switch(type) {
      case 'b':
        return val;
      case 'e':
        return val;
      case 'n':
        return val;
      case 's':
        return val;
      case 'd':
        return val;
      case 'z':
        return val;
      default:
        throw new Error('Invalid type');
    }
  }

  #getParser(column) {
    switch (column) {
      case this.SHIFT_COLUMN:
        return new ShiftParser();
      case this.PEOPLE_NEEDED_COLUMN:
        throw new Error('Not implemented');
      case this.UNAVAILABLILITY_COLUMN:
        throw new Error('Not implemented');
      default:
        throw new Error('Invalid column');
    }
  }
}

class ShiftParser {
  #currentDay = null;

  constructor() {
    this.#currentDay = null;
    this.json = {};
  }

  parse = (val, row) => {
    if (this.#isDate(val)) {
      this.setDay(val);
    } else if (this.#isShift(val)) {
      this.loadShift(row, val);
    }
  }

  #isDate = (val) => {
    return /^(?=.*[a-zA-Z])(?=.*\d)[^-]+$/.test(val);
  }

  #isShift = (val) => {
    return /^(\d{1,2}:\d{2})-(\d{1,2}:\d{2})$/.test(val);
  }

  // day string: Nov 19, or anything not containing '-'
  setDay = (day) => {
    this.#currentDay = day;
  }

  // shift string: 10:00-12:00
  loadShift = (row, shift) => {
    const [start, end] = shift.split('-');
    this.json[this.#currentDay] = {
      ...this.json[this.#currentDay],
      [row]: {
        start,
        end,
      }
    }
  }
}
