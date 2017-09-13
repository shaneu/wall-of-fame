import queryString from 'query-string';

function checkStatus(response) {
  if (response.status === 200) {
    return response;
  }

  const error = new Error();
  error.status = response.statusText;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export function getBeers(sucess) {
  fetch('/api/beers', {
    headers: {
      Accept: 'application/json',
    },
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(sucess);
}

export function updateBeer(data) {
  fetch('/api/beers', {
    method: 'put',
    body: JSON.stringify(data),
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
