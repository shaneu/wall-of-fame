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

module.exports = app;
