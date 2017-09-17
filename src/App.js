// @flow
/* eslint react/jsx-filename-extension: 0 */

import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  addBeerToDB,
  getBeersFromDB,
  updateBeer,
  deleteBeer,
} from './client-helpers';
import CheckedInDashBoard from './Components/CheckedInDashBoard';
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
};

class App extends React.Component<void, State> {
  state = {
    beers: [],
  };

  componentDidMount = () => {
    getBeersFromDB(
      (response: { _metadata: number, checkedInBeers: Beer | Array<Beer> }) => {
        this.setState({
          beers: this.state.beers.concat(response.checkedInBeers),
        });
      },
    );
  };

  createBeerCard = (beer: Beer) => {
    addBeerToDB(beer, response =>
      this.setState({
        beers: this.state.beers.concat(response),
      }),
    );
  };

  editBeer = (userInput: { id: number, rating: string, notes: string }) => {
    this.setState({
      beers: this.state.beers.map(beer => {
        if (beer.id === userInput.id) {
          return Object.assign({}, beer, userInput);
        }
        return beer;
      }),
    });

    updateBeer(userInput);
  };

  deleteBeer = (beerCardId: number) => {
    this.setState({
      beers: this.state.beers.filter((beer: Beer) => beer.id !== beerCardId),
    });

    deleteBeer(beerCardId);
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header {...this.props} />
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
                render={props => (
                  <SearchDashBoard
                    onBeerCardCreate={this.createBeerCard}
                    {...props}
                  />
                )}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
