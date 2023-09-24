export default class PeopleRequiredParser {
  constructor(json) {
    this.json = json;
  }

  // could do a map, but I'm gonna brute force this shit lol
  parse = (val, row) => {
    if (this.#isNumber(val)) {
      debugger;
      for (const day in this.json) {
        debugger;
        const updatedArr = this.json[day].map((shift) => {
          if (shift["row"] === row) {
            return {
              ...shift,
              peopleRequired: val,
            };
          }
          return shift;
        });
        this.json[day] = updatedArr;
        debugger;
      }
    }
  };

  #isNumber = (val) => {
    return !isNaN(val);
  };
}
