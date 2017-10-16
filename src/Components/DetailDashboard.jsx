// @ flow

import * as React from 'react';
import EditableBeerCard from './EditableBeerCard';
import { getBeerInfo } from '../client-helpers';

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

class Detail extends React.Component<Props, State> {
  state = {
    beer: {},
  };

  componentDidMount = () => {
    this.loadBeer();
  };

  loadBeer = () => {
    const pathname = this.props.pathname;
    const beerId = pathname.replace('/beer/', '');
    getBeerInfo(beerId).then(response => this.setState({ beer: response }));
  };

  render() {
    return <EditableBeerCard showDetailCard onBeerCardCreate={this.props.onBeerCardCreate} {...this.state.beer} />;
  }
}

export default Detail;
