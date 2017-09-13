const fetch = require('node-fetch');

const clientId = 'D0B24A1296C1C8AFFD91F388EAFA5876CAE45792';
const clientSecret = '40DDC7CE687D34D0F5E9B84891A0248A3F4DA416';
const queryParams = `&client_id=${clientId}&client_secret=${clientSecret}`;
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
  const uri = `${searchURI}${beer}${queryParams}`;
  return fetch(uri, init)
    .then(parseJSON)
    .then(format)
    .catch(err => console.log(err)); // eslint-disable-line no-console
};
