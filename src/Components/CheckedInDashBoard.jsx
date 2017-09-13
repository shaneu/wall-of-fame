// @ flow

import * as React from 'react';
import EditableBeerCardList from './EditableBeerCardList';

class CheckedInDashBoard extends React.Component {
  componentDidMount = () => {
    console.log('mounted'); // eslint-disable-line no-console
  };

  render() {
    return (
      <div>
        <h2>Checked In Beers</h2>
        <EditableBeerCardList beers={this.props.beers} />
      </div>
    );
  }
}

export default CheckedInDashBoard;
