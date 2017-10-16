const mongoose = require('mongoose');
const { searchBeer, getBeerInfo } = require('../helpers');

const Beer = mongoose.model('Beer');

exports.getBeers = async (req, res) => {
  const beers = await Beer.find();
  const metadata = { total_count: beers.length };
  res.json({ _metadata: metadata, checkedInBeers: beers });
};

exports.addBeer = async (req, res) => {
  const newBeer = await new Beer(req.body).save();
  res.json(newBeer);
};

exports.updateBeer = async (req, res) => {
  const updatedBeer = await Beer.findByIdAndUpdate(
    req.params.id,
    {
      $set: { notes: req.body.notes, rating: req.body.rating },
    },
    {
      new: true,
    },
  );
  res.json(updatedBeer);
};

exports.getIndividualBeer = async (req, res) => {
  const beer = await Beer.findOne({ _id: req.params.id });
  res.json({ beer });
};

exports.deleteBeer = async (req, res) => {
  const id = +req.params.id;
  const deletedBeer = await Beer.remove({ id });
  res.json(deletedBeer);
};

exports.searchUntappd = (req, res) => {
  searchBeer(req.params.beer)
    .then(response => res.json(response))
    .catch(err => console.log(err)); // eslint-disable-line no-console
};

exports.getBeerInfoUntappd = (req, res) => {
  getBeerInfo(req.params.beerId)
    .then(response => res.json(response))
    .catch(err => console.log(err)); // eslint-disable-line no-console
};
