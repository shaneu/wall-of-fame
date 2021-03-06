// @ flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

type Props = {
  abv: string,
  brewery: string,
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
  console.log();
  let checkInTotal;
  if (props.checkins) {
    checkInTotal = <p>Checkins: {props.checkins}</p>;
  }
  return (
    <div>
      <h2>
        <Link to={`/beer/${props.id}`}>{props.name}</Link>
      </h2>
      <p>{props.brewery}</p>
      {checkInTotal}
      <img alt="beer label" src={props.imgUrl} />
      <h3>Description:</h3>
      <p>{props.description}</p>
      <h4>Abv: {props.abv}%</h4>
      <h4>Ibu: {props.ibu}</h4>
      <h4>Style:</h4>
      <p>{props.style}</p>
      <p>Checkins: {props.checkinCount}</p>
      {props.dateAdded && (
        <div>
          <h3>Rating: {props.rating}/5</h3>
          <h3>Notes:</h3>
          <p>{props.notes}</p>
          <p>Added: {distanceInWordsToNow(props.dateAdded)} ago</p>
        </div>
      )}
    </div>
  );
}

export default BeerCard;
