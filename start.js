const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.error(err.message); // eslint-disable-line no-console
});
require('./models/Beer');
const app = require('./server');

app.set('port', process.env.PORT || 3001);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`); // eslint-disable-line no-console
});
