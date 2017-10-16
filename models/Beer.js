const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const beerSchema = new mongoose.Schema({
  abv: Number,
  brewery: String,
  dateAdded: {
    type: Date,
    default: Date.now(),
  },
  description: String,
  id: Number,
  ibu: Number,
  imgUrl: String,
  name: String,
  notes: {
    type: String,
    trim: true,
  },
  rating: String,
  style: String,
});

module.exports = mongoose.model('Beer', beerSchema);
