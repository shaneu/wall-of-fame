// @ flow

import * as React from 'react';
import EditableBeerCardList from './EditableBeerCardList';
import { individualBeerTotals, getNumberOfKeys } from '../client-helpers';

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
  usersBeerInfo: {
    beers: Array<Beer>,
    total: number,
  },
  onBeerCardDelete: Function,
  onBeerCardEdit: Function,
};

function CheckedInDashBoard(props: Props) {
  const checkInsPerBeer = individualBeerTotals(props.usersBeerInfo.beers);
  const totalUnique = getNumberOfKeys(checkInsPerBeer);
  return (
    <div>
      <h2>Checked In Beers</h2>
      <h4>Total: {props.usersBeerInfo.total}</h4>
      <h4>Unique: {totalUnique}</h4>
      <EditableBeerCardList
        beers={props.usersBeerInfo.beers}
        onBeerCardEdit={props.onBeerCardEdit}
        onBeerCardDelete={props.onBeerCardDelete}
        checkInsPerBeer={checkInsPerBeer}
      />
    </div>
  );
}

export default CheckedInDashBoard;
