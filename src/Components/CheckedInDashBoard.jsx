// @ flow

import * as React from 'react';
import EditableBeerCardList from './EditableBeerCardList';

function CheckedInDashBoard(props) {
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
