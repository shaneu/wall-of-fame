// @flow
/* eslint react/jsx-filename-extension: 0 */

import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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

  createBeerCard = (beer: Beer) => {
    this.setState({
      beers: this.state.beers.concat(beer),
    });
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
