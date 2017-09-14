import queryString from 'query-string';

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

export function getBeersFromDB(sucess) {
  fetch('/api/beers', {
    headers: {
      Accept: 'application/json',
    },
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(sucess);
}

export function updateBeer(beer) {
  fetch('/api/beers', {
    method: 'put',
    body: JSON.stringify(beer),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  }).then(checkStatus);
}

export function deleteBeer(id) {
  fetch('api/beers', {
    method: 'delete',
    body: JSON.stringify({ id }),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  }).then(checkStatus);
}

export function addBeerToDB(...beer) {
  fetch('/api/beers', {
    method: 'post',
    body: JSON.stringify({ beer }),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  }).then(checkStatus);
}

export function searchBeer(beer) {
  return fetch(`/api/beers/search/${beer}`, {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-type': 'application/json' },
  })
    .then(checkStatus)
    .then(parseJSON);
}

function removeFunctionFromObj(obj) {
  return Object.keys(obj).reduce((acc, cur) => {
    if (typeof obj[cur] !== 'function') {
      acc[cur] = obj[cur];
    }
    return acc;
  }, {});
}

function getCurrentDate() {
  const date = new Date();
  return { dateAdded: date.toLocaleDateString() };
}

function mergeObjects(...objs) {
  return Object.assign({}, ...objs);
}

export function formatBeerToSubmit(obj, userInput) {
  return mergeObjects(removeFunctionFromObj(obj), getCurrentDate(), userInput);
}

export function parseQueryString(qString) {
  const query = queryString.parse(qString);
  return query.q;
}
