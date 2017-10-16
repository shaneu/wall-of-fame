// @ flow

import * as React from 'react';
import SearchField from './SearchField';
import NavBar from './NavBar';

function Header(props) {
  return (
    <header>
      <h1>Wall of Fame</h1>
      <p>A virtual shelf of beer bottles and cans</p>
      <NavBar />
      <SearchField {...props} />
    </header>
  );
}

export default Header;
