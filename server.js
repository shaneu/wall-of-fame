// @ flow

const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./routes/index');
const errorHandlers = require('./handlers/errorHandlers');
require('./handlers/passport');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(passport.initialize());
app.use(passport.session());

app.set('port', process.env.PORT || 3001);

app.use('/', routes);

app.use(errorHandlers.logErrors);

<<<<<<< HEAD
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

app.get('/api/beers/:id', (req, res) => {
  db
    .collection('usersBeers')
    .findOne({ _id: ObjectId(req.params.id) })
    .then(beer => {
      db
        .collection('usersBeers')
        .count({ id: beer.id })
        .then(count => {
          res.json({ beer, checkins: count });
        });
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

// create a get route to search for an individual beer by its id. when I click the link on the header of a beer, it should send me to this route, where it will check if its'a beer I've had before, and if it is show the number, along with how many other people have had the same beer

app.put('/api/beers', (req, res) => {
  db
    .collection('usersBeers')
    .update({ id: req.body.id }, { $set: { rating: req.body.rating, notes: req.body.notes } })
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
    .then(result => db.collection('usersBeers').findOne({ _id: result.insertedId }))
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
=======
module.exports = app;
>>>>>>> development
