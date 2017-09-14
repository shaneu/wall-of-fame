// @flow
/* eslint react/jsx-filename-extension: 0 */

import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { addBeerToDB, getBeersFromDB, updateBeer } from './client-helpers';
import CheckedInDashBoard from './Components/CheckedInDashBoard';
import SearchDashBoard from './Components/SearchDashBoard';
import Header from './Components/Header';

type Beer = {
  abv: number,
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

class App extends React.Component {
  state = {
    beers: [],
  };

  componentDidMount = () => {
    getBeersFromDB(response => this.setState({ beers: response }));
  };

  createBeerCard = (beer: Beer) => {
    this.setState({
      beers: this.state.beers.concat(beer),
    });
    addBeerToDB(beer);
  };

  // editBeer = (attrs: Beer) => {
  //   this.setState({
  //     beers: this.state.beers.map(beer => {
  //       if (beer.id === beerToEdit.id) {
  //         return Object.assign({}, beer, attrs)
  //       }
  //       return beer;
  //     })
  //   })

  //   updateBeer(beer);
  // };

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
                render={() => <CheckedInDashBoard beers={this.state.beers} />}
              />
              <Route
                path="/search"
                render={props =>
                  (<SearchDashBoard
                    onBeerCardCreate={this.createBeerCard}
                    {...props}
                  />)}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
