const fetch = require('node-fetch');

const clientId = process.env.UNTAPPD_CLIENT_ID;
const clientSecret = process.env.UNTAPPD_CLIENT_SECRET;
const clientInfo = `&client_id=${clientId}&client_secret=${clientSecret}`;
const searchURI = 'https://api.untappd.com/v4/search/beer?q=';
const beerInfoURI = 'https://api.untappd.com/v4/beer/info/';

function parseJSON(response) {
  return response.json();
}

function format(data) {
  return data.response.beers.items.map(beer => ({
    abv: beer.beer.beer_abv,
    brewery: beer.brewery.brewery_name,
    checkinCount: beer.checkin_count,
    description: beer.beer.beer_description,
    ibu: beer.beer.beer_ibu,
    id: beer.beer.bid,
    imgUrl: beer.beer.beer_label,
    name: beer.beer.beer_name,
    style: beer.beer.beer_style,
  }));
}

function formatBeerInfo(response) {
  const beerResponse = response.response.beer;
  return {
    abv: beerResponse.beer_abv,
    brewery: beerResponse.brewery.brewery_name,
    brewery_city: beerResponse.brewery.location.brewery_city,
    brewery_state: beerResponse.brewery.location.brewery_state,
    checkinCount: beerResponse.stats.total_count,
    description: beerResponse.beer_description,
    ibu: beerResponse.beer_ibu,
    id: beerResponse.bid,
    imgUrl: beerResponse.beer_label,
    name: beerResponse.beer_name,
    overallRating: beerResponse.rating_score,
    style: beerResponse.beer_style,
  };
}

function searchBeer(beer) {
  const init = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  };
  const uri = `${searchURI}${beer}${clientInfo}`;
  return fetch(uri, init)
    .then(parseJSON)
    .then(format)
    .catch(err => console.log(err)); // eslint-disable-line no-console
}

function getBeerInfo(beerId) {
  const init = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  };

  const uri = `${beerInfoURI}${beerId}?compact=true&${clientInfo}`;
  return fetch(uri, init)
    .then(parseJSON)
    .then(formatBeerInfo)
    .catch(error => console.log(error)); // eslint-disable-line no-console
}

module.exports = {
  searchBeer,
  getBeerInfo,
};
