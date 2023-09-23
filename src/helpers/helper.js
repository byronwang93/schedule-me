const XLSX = require("xlsx");

export const readFile = (event) => {
  const file = event.target.files[0];
  console.log(file, " is the file");

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      console.log(jsonData, " is json");
    };

    reader.readAsArrayBuffer(file);
  }
};
