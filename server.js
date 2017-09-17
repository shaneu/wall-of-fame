// @ flow

const express = require('express');
const bodyParser = require('body-parser');
const searchBeer = require('./helpers');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.json());
app.set('port', process.env.port || 3001);

const mongoURI = 'mongodb://127.0.0.1:27017/usersCheckedInBeers';

let db;

MongoClient.connect(mongoURI)
  .then(connection => {
    db = connection;
    app.listen(app.get('port'), () =>
      console.log(
        `Api server is running on http://localhost:${app.get('port')}`,
      ),
    );
  })
  .catch(error => console.log(`Error in mongodb: ${error}`));

app.get('/api/beers', (req, res) => {
  db
    .collection('usersBeers')
    .find()
    .toArray()
    .then(beers => {
      const metadata = { total_count: beers.length };
      res.json({ _metadata: metadata, checkedInBeers: beers });
    })
    .catch(error => {
      console.log(error); // eslint-disable-line no-console
      res.status.json({ message: `Internal server error ${error}` });
    });
});

app.get('/api/beers/search/:beer', (req, res) => {
  searchBeer(req.params.beer)
    .then(response => res.json(response))
    .catch(error => console.log(error)); // eslint-disable-line no-console
});

app.put('/api/beers', (req, res) => {
  db
    .collection('usersBeers')
    .update(
      { id: req.body.id },
      { $set: { rating: req.body.rating, notes: req.body.notes } },
    )
    .then(response => res.json(response.result))
    .catch(error => {
      console.log(error); // eslint-disable-line no-console
      res.status(500).json({ message: `Internal server error: ${error}` });
    });
});

app.post('/api/beers', (req, res) => {
  db
    .collection('usersBeers')
    .insertOne(req.body)
    .then(result =>
      db
        .collection('usersBeers')
        .find({ _id: result.insertedId })
        .limit(1)
        .next(),
    )
    .then(newBeer => res.json(newBeer))
    .catch(error => {
      console.log(error); // eslint-disable-line no-console
      res.status(500).json({ message: `Internal server error: ${error}` });
    });
});

app.delete('/api/beers', (req, res) => {
  db
    .collection('usersBeers')
    .remove({ id: req.body.id })
    .then(response => res.json(response.result))
    .catch(error => {
      console.log(error); // eslint-disable-line no-console
      res.status(500).json({ message: `Internal server error: ${error}` });
    });
});
