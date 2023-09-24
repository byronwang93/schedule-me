import ShiftParser from "./shiftParser";
import PeopleRequiredParser from "./peopleRequiredParser";
import UnavalabilityParser from "./unavailabilityParser";

const XLSX = require("xlsx");

export default class ScheduleTemplateParser {
  SHIFT_COLUMN = "A";
  PEOPLE_NEEDED_COLUMN = "B";
  UNAVAILABLILITY_COLUMN = "C";

  #worksheet = null;
  #output = null;

  constructor(file) {
    this.file = file;
    this.#worksheet = null;
    this.#output = {};
  }

  readFile = async () => {
    if (!this.file) {
      throw new Error("No file provided");
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
    this.#parseColumn(this.SHIFT_COLUMN);
    this.print()
    this.#parseColumn(this.PEOPLE_NEEDED_COLUMN);
  };

  print = () => {
    console.log(this.#output);
  };

  // bad complexity, bad way to set return value
  #parseColumn = (column) => {
    const parser = this.#getParser(column);
    for (let entry in this.#worksheet) {
      const entryColumn = entry.toString()[0];
      const entryRow = entry.toString().slice(1);
      if (entryColumn === column) {
        parser.parse(this.#parseEntry(this.#worksheet[entry]), entryRow);
      } else {
        continue;
      }
    }
    this.#output = parser.json;
  };

  #parseEntry = (content, usingProvidedType = false) => {
    const val = usingProvidedType ? content["v"] : content["w"];
    const type = content["t"];
    switch (type) {
      case "b":
        return val;
      case "e":
        return val;
      case "n":
        return val;
      case "s":
        return val;
      case "d":
        return val;
      case "z":
        return val;
      default:
        throw new Error("Invalid type");
    }
  };

  #getParser(column) {
    switch (column) {
      case this.SHIFT_COLUMN:
        return new ShiftParser({});
      case this.PEOPLE_NEEDED_COLUMN:
        return new PeopleRequiredParser(this.#output);
      case this.UNAVAILABLILITY_COLUMN:
        return new UnavalabilityParser(this.#output);
      default:
        throw new Error("Invalid column");
    }
  }
}
