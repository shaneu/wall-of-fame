// @ flow
import * as React from 'react';
import EditableBeerCard from './EditableBeerCard';

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

type Props = {
  beers: Array<Beer>,
  onBeerCardCreate: Function,
  onBeerCardEdit: Function,
  onBeerCardDelete: Function,
};

function EditableBeerCardList(props: Props) {
  let utilSpace;
  let cards;
  if (props.beers.length > 0) {
    cards = props.beers.map(beer => (
<<<<<<< HEAD
        <EditableBeerCard
          key={beer._id ? beer._id : beer.id}
          {...beer}
          onBeerCardCreate={props.onBeerCardCreate}
          onBeerCardEdit={props.onBeerCardEdit}
          onBeerCardDelete={props.onBeerCardDelete}
          checkInTotal={props.checkInsPerBeer[beer.id]}
        />
      ));
=======
      <EditableBeerCard
        showDetailCard={false}
        key={beer._id ? beer._id : beer.id}
        {...beer}
        onBeerCardCreate={props.onBeerCardCreate}
        onBeerCardEdit={props.onBeerCardEdit}
        onBeerCardDelete={props.onBeerCardDelete}
      />
    ));
>>>>>>> development
  }
  if (cards) {
    utilSpace = cards;
  } else {
    utilSpace = <h3>Drink Some Beer!</h3>;
  }

  return <div>{utilSpace}</div>;
}

export default EditableBeerCardList;
