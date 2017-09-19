// @ flow

import * as React from 'react';
import BeerCard from './BeerCard';
import { getCheckedInBeer } from '../client-helpers';

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

type Props = {
  pathname: string,
};

type State = {
  beer: Beer,
  checkins: number,
};

class CheckIn extends React.Component<Props, State> {
  state = {
    beer: {},
    checkins: 0,
  };

  componentDidMount = () => {
    this.getBeerFromDB();
  };

  getBeerFromDB = () => {
    const url = this.props.pathname;
    const idFromUrl = url.replace('/checkin/', ''); // eslint-disable-line no-useless-escape
    getCheckedInBeer(idFromUrl, response => {
      this.setState({ beer: response.beer, checkins: response.checkins });
    });
  };

  render() {
    return <BeerCard {...this.state.beer} checkins={this.state.checkins} />;
  }
}

export default CheckIn;
