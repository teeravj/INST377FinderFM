const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/api', (req, res) => {
  const baseURL = 'https://data.princegeorgescountymd.gov/resource/sphi-rwax.json';
  fetch(baseURL)
    .then((r) => r.json())
    .then((fmarray) => {
      console.log(fmarray);
      res.send({ fmarray: fmarray});
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/error');
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
