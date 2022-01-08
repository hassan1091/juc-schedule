const express = require("express");
const bodyParser = require("body-parser");
const xlsx = require("xlsx");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/public", express.static(__dirname + "/public"));

var workbook = xlsx.readFile("Semester.xlsx");

var tableWorkSheet = workbook.Sheets["Table"];
var schedulData = xlsx.utils.sheet_to_json(tableWorkSheet);

app.get("/", (req, res) => {
  res.render("home", {
    schedulData: schedulData,
  });
});

app.get("/data", (req, res) => {
  console.log(schedulData[8].Room_No);
  res.send(schedulData);
});


app.listen(process.env.PORT || 5000, function() {
  console.log("Server started on port 5000");
});