// @ flow

import * as React from 'react';
import { searchBeer, parseQueryString } from '../client-helpers';
import EditableBeerCardList from './EditableBeerCardList';

type Props = {
  onBeerCardCreate: Function,
  location: {
    hash: string,
    pathname: string,
    search: string,
  },
};

class SearchDashBoard extends React.Component<void, Props, void> {
  state = {
    searchResults: [],
  };

  componentDidMount = () => {
    this.handleBeerSearch();
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.location.search !== nextProps.location.search) {
      this.handleBeerSearch(nextProps.location.search);
    }
  };

  searchForBeer = beer => {
    searchBeer(beer).then(response => {
      this.setState({ searchResults: response });
    });
  };

  handleBeerSearch = (query = this.props.location.search) => {
    const beerToSearchFor = parseQueryString(query);
    this.searchForBeer(beerToSearchFor);
  };

  render() {
    return (
      <div>
        <EditableBeerCardList
          beers={this.state.searchResults}
          onBeerCardCreate={this.props.onBeerCardCreate}
        />
      </div>
    );
  }
}

export default SearchDashBoard;
