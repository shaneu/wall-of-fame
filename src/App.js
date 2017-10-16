// @flow
/* eslint react/jsx-filename-extension: 0 */

import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { addBeerToDB, getBeersFromDB, updateBeer, deleteBeer } from './client-helpers';
import CheckedInDashBoard from './Components/CheckedInDashBoard';
import DetailDashboard from './Components/DetailDashboard';
import SearchDashBoard from './Components/SearchDashBoard';
import Header from './Components/Header';

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

type State = {
  beers: Array<Beer>,
  total: number,
};

class App extends React.Component<void, State> {
  state = {
    beers: [],
  };

  componentDidMount = () => {
    getBeersFromDB((response: { _metadata: { total_count: number }, checkedInBeers: Beer | Array<Beer> }) => {
      this.setState({
        beers: this.state.beers.concat(response.checkedInBeers),
      });
    });
  };

  createBeerCard = (beer: Beer) => {
    addBeerToDB(beer).then(response =>
      this.setState({
        beers: this.state.beers.concat(response),
      }),
    );
  };

  editBeer = (userInput: { _id: string, rating: string, notes: string }) => {
    updateBeer(userInput).then(response => {
      this.setState({
        beers: this.state.beers.map(beer => {
          if (beer._id === response._id) {
            return Object.assign({}, beer, userInput);
          }
          return beer;
        }),
      });
    });
  };

  deleteBeer = (beerCardId: number) => {
    this.setState({
      beers: this.state.beers.filter((beer: Beer) => beer.id !== beerCardId),
    });

    deleteBeer(beerCardId);
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route render={({ history }) => <Header {...history} />} />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <CheckedInDashBoard
                  beers={this.state.beers}
                  onBeerCardEdit={this.editBeer}
                  onBeerCardDelete={this.deleteBeer}
                />
              )}
            />
            <Route
              path="/search"
              render={props => <SearchDashBoard onBeerCardCreate={this.createBeerCard} {...props} />}
            />
            <Route
              path="/beer"
              render={({ location }) => (
                <DetailDashboard pathname={location.pathname} onBeerCardCreate={this.createBeerCard} />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
