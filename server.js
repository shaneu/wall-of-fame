// @ flow

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const searchBeer = require('./helpers');

const app = express();
app.use(bodyParser.json());
app.set('port', process.env.port || 3001);

const DATA_FILE = path.join(__dirname, 'data.json');

app.get('/api/beers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    res.json(parsedData);
  });
});

app.get('/api/beers/search/:beer', (req, res) => {
  searchBeer(req.params.beer)
    .then(response => res.json(response))
    .catch(error => console.log(error)); // eslint-disable-line no-console
});

app.put('/api/beers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) throw err;
    const beers = JSON.parse(data);
    const updatedBeers = beers.map(beer => {
      if (beer.id === req.body.id) {
        return Object.assign({}, beer, {
          rating: req.body.rating,
          notes: req.body.notes,
        });
      }
      return beer;
    });
    fs.writeFile(DATA_FILE, JSON.stringify(updatedBeers, null, 2), () =>
      res.json({}),
    );
  });
});

app.post('/api/beers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) throw err;
    const beers = JSON.parse(data);
    const addedBeer = beers.concat(req.body.beer);

    fs.writeFile(DATA_FILE, JSON.stringify(addedBeer, null, 2), () =>
      res.json({}),
    );
  });
});

app.delete('/api/beers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) throw err;
    const beers = JSON.parse(data);
    const beersAfterDelete = beers.filter(beer => beer.id !== req.body.id);
    fs.writeFile(DATA_FILE, JSON.stringify(beersAfterDelete, null, 2), () =>
      res.json({}),
    );
  });
});

app.listen(
  app.get('port'),
  () =>
    console.log(`Api server is running on http://localhost:${app.get('port')}`), // eslint-disable-line no-console
);
