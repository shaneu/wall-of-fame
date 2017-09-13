// @ flow

import * as React from 'react';

type Props = {
  abv: string,
  dateAdded: string,
  description: string,
  ibu: string,
  imgUrl: string,
  name: string,
  notes: string,
  rating: string,
  style: string,
};

function BeerCard(props: Props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <img alt="beer label" src={props.imgUrl} />
      <h3>Description:</h3>
      <p>{props.description}</p>
      <h4>Abv: {props.abv}%</h4>
      <h4>Ibu: {props.ibu}</h4>
      <h4>Style:</h4>
      <p>{props.style}</p>
      {props.dateAdded && (
        <div>
          <h3>Rating: {props.rating}/5</h3>
          <h3>Notes:</h3>
          <p>{props.notes}</p>
          <h3>Added on: {props.dateAdded}</h3>
        </div>
      )}
    </div>
  );
}

export default BeerCard;
