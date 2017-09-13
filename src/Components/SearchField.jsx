// @ flow

import * as React from 'react';
import { Link } from 'react-router-dom';

class SearchField extends React.Component {
  state = {
    searchTerm: '',
  };

  handleSearchInput = e => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  handleClick = () => {
    this.setState({ searchTerm: '' });
  };

  render() {
    return (
      <div>
        <Link
          to={`/search/?q=${this.state.searchTerm}`}
          onClick={this.handleClick}
        >
          <svg
            height="20"
            width="20"
            viewBox="0 0 16 16"
            aria-label="Search icon"
            role="img"
          >
            <path
              d="M6.162 10.035a3.877 3.877 0 0 1-3.873-3.873A3.877 3.877 0 0 1 6.162 2.29a3.877 3.877 0 0 1 3.873 3.872 3.877 3.877 0 0 1-3.873 3.873m9.363 3.196l-3.081-3.08a1.614 1.614 0 0 0-1.23-.468 6.127 6.127 0 0 0 1.11-3.521 6.162 6.162 0 1 0-6.162 6.162 6.13 6.13 0 0 0 3.521-1.109c-.022.442.13.891.467 1.229l3.081 3.081a1.622 1.622 0 0 0 2.294-2.294"
              data-reactid="34"
            />
          </svg>
        </Link>
        <input
          type="text"
          onChange={this.handleSearchInput}
          name="q"
          value={this.state.searchTerm}
          autoComplete="off"
        />
      </div>
    );
  }
}

export default SearchField;
