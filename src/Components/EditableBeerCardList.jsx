// @ flow
import * as React from 'react';
import EditableBeerCard from './EditableBeerCard';

function EditableBeerCardList(props) {
  const cards = props.beers.map(beer => (
    <EditableBeerCard
      key={beer.id}
      {...beer}
      onBeerCardCreate={props.onBeerCardCreate}
    />
    ));
  return <div>{cards}</div>;
}

export default EditableBeerCardList;
