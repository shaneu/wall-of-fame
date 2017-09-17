// @ flow

import * as React from 'react';
import EditableBeerCardList from './EditableBeerCardList';

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
  onBeerCardDelete: Function,
  onBeerCardEdit: Function,
};

function CheckedInDashBoard(props: Props) {
  return (
    <div>
      <h2>Checked In Beers</h2>
      <EditableBeerCardList
        beers={props.beers}
        onBeerCardEdit={props.onBeerCardEdit}
        onBeerCardDelete={props.onBeerCardDelete}
      />
    </div>
  );
}

export default CheckedInDashBoard;
