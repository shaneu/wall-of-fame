// @flow

import * as React from 'react';

type Flash = {
  message: String,
  category: String,
};

function FlashMessages(props: { flashes: Array<Flash> }) {
  const utilSpace = props.flashes.map(flash => (
    <div>
      <p>{flash.message}</p>
    </div>
  ));

  return <div>{utilSpace}</div>;
}

export default FlashMessages;
