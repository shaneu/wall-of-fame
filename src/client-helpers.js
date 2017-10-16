// @ flow

import queryString from 'query-string';

type Beer = {
  _id?: string,
  abv: number,
  brewery: string,
  dateAdded: string,
  description: string,
  id: number,
  ibu: number,
  imgUrl: string,
  name: string,
  notes: string,
  rating: string,
  style: string,
};

function checkStatus(response) {
  if (response.status === 200) {
    return response;
  }

  const error = new Error(`Http error ${response.status}`);
  error.status = response.statusText;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export function getBeersFromDB(sucess: Function): void {
  fetch('/api/beers', {
    headers: {
      Accept: 'application/json',
    },
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(sucess);
}

export function getBeerInfo(beerId) {
  return fetch(`/api/beers/info/${beerId}`, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(parseJSON);
}

export function updateBeer(userInput: { _id: string, rating: string, notes: string }): void {
  return fetch(`/api/beers/${userInput._id}`, {
    method: 'put',
    body: JSON.stringify({ rating: userInput.rating, notes: userInput.notes }),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(parseJSON);
}

export function deleteBeer(id: number) {
  fetch(`api/beers/${id}`, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  }).then(checkStatus);
}

export function addBeerToDB(beer: Beer, sucess: Function) {
  return fetch('/api/beers', {
    method: 'post',
    body: JSON.stringify(beer),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(parseJSON);
}

export function searchBeer(beer) {
  return fetch(`/api/beers/search/${beer}`, {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-type': 'application/json' },
  })
    .then(checkStatus)
    .then(parseJSON);
}

// function getCurrentDate() {
//   const date = new Date();
//   return date.toLocaleDateString();
// }

function formatBeer(beer) {
  const formattedBeer = {
    abv: beer.abv,
    brewery: beer.brewery,
    checkinCount: beer.checkinCount,
    description: beer.description,
    ibu: beer.ibu,
    id: beer.id,
    imgUrl: beer.imgUrl,
    name: beer.name,
    notes: beer.notes,
    style: beer.style,
    rating: beer.rating,
  };
  return formattedBeer;
}

function mergeObjects(...objs) {
  return Object.assign({}, ...objs);
}

export function formatBeerToSubmit(obj, userInput) {
  const beerToFormat = mergeObjects(obj, userInput);
  return formatBeer(beerToFormat);
}

export function parseQueryString(qString) {
  const query = queryString.parse(qString);
  return query.q;
}

export function getNumberOfKeys(obj) {
  return Object.keys(obj).length;
}

export function individualBeerTotals(beers) {
  return beers.reduce((acc, cur) => {
    if (!acc[cur.id]) {
      acc[cur.id] = 0;
    }
    acc[cur.id] += 1;
    return acc;
  }, {});
}
