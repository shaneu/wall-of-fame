const fetch = require('node-fetch');
const env = require('./app-env');

const clientId = env.UNTAPPD_CLIENT_ID;
const clientSecret = env.UNTAPPD_CLIENT_SECRET;
const authParams = `&client_id=${clientId}&client_secret=${clientSecret}`;
const searchURI = 'https://api.untappd.com/v4/search/beer?q=';

function parseJSON(response) {
  return response.json();
}

function format(data) {
  return data.response.beers.items.map(beer => ({
    abv: beer.beer.beer_abv,
    brewery: beer.brewery.brewery_name,
    description: beer.beer.beer_description,
    ibu: beer.beer.beer_ibu,
    id: beer.beer.bid,
    imgUrl: beer.beer.beer_label,
    name: beer.beer.beer_name,
    style: beer.beer.beer_style,
  }));
}

module.exports = function searchBeer(beer) {
  const init = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  };
  const uri = `${searchURI}${beer}${authParams}`;
  return fetch(uri, init)
    .then(parseJSON)
    .then(format)
    .catch(err => console.log(err)); // eslint-disable-line no-console
};
