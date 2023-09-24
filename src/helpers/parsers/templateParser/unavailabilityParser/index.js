export default class UnavalabilityParser {
  constructor(json) {
    this.json = json;
  }

  parse = (val, row) => {
    if (row <= 1) return;
    for (const day in this.json) {
      debugger;
      const updatedArr = this.json[day].map((shift) => {
        if (shift["row"] === row) {
          return {
            ...shift,
            unavailabilityList: val.split(","),
          };
        }
        return shift;
      });
      this.json[day] = updatedArr;
      debugger;
    }
  };

  debug = () => {
    console.log(this.json);
  };
}
