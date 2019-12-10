const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

const cors = require("cors");

console.log(process.env.PGCOUNTYSECRETAPITOKEN);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static("build"));

app.get("/", (req, res) => {
  const baseURL =
    "https://data.princegeorgescountymd.gov/resource/sphi-rwax.json";
  fetch(baseURL)
    .then(r => r.json())
    .then(data => {
      let cleanData = [];

      data.forEach(i => {
        if (i.season1time && i.farmers_market_id != "1010258") {
          cleanData.push(i);
        }
      });
      console.log(cleanData);
      res.send({ cleanData: cleanData });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/error");
    });
});

app.post("/", (req, res) => {
  res.send({ "hello world!": "hello world!" });
});

app.put("/", (req, res) => {
  res.send({ "hello world!": "hello world!" });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
