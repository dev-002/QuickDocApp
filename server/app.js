const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log("PathName:", req.path);
  next();
});

app.use("/api/v1", require("./routes/route"));

module.exports = app;
