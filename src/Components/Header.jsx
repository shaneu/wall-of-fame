// @ flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import SearchField from './SearchField';

function Header(props) {
  return (
    <header>
      <h1>Wall of Fame</h1>
      <p>A virtual shelf of beer bottles and cans</p>
      <SearchField {...props} onBeerSearch={props.onBeerSearch} />
      <Link to="/">Home</Link>
    </header>
  );
}

export default Header;
