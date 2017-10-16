// @ flow

import * as React from 'react';

function DetailCard(props) {
  return (
    <div>
      <img alt="Beer's label" src={props.imgUrl} />
      <h2>{props.name}</h2>
      <p>{props.style}</p>
      <p>{props.brewery}</p>
      <p>
        {props.brewery_city}, {props.brewery_state}
      </p>
      <p>ABV: {props.abv}</p>
      <p>IBU: {props.ibu}</p>
      <p>Overall rating: {props.overallRating} / 5</p>
      <p>Checkins: {props.checkinCount}</p>
      <p>Your checkins: </p>
      <p>{props.description}</p>
    </div>
  );
}

export default DetailCard;
