// @ flow

import * as React from 'react';
import BeerCard from './BeerCard';
import EditForm from './EditForm';
import { formatBeerToSubmit } from '../client-helpers';

type Props = {
  abv: string,
  dateAdded?: string,
  description: string,
  id: string,
  ibu: string,
  imgUrl: string,
  name: string,
  notes?: string,
  rating?: string,
  style: string,
};

class EditableBeerCard extends React.Component<void, Props, void> {
  state = {
    showEditForm: false,
  };

  showEditForm = () => {
    this.setState((prevState: boolean) => ({
      showEditForm: !prevState.showEditForm,
    }));
  };

  handleBeerCardAdd = userInput => {
    this.showEditForm();
    this.addBeerCard(userInput);
  };

  addBeerCard = userInput => {
    const beerToSubmit = formatBeerToSubmit(this.props, userInput);
    this.props.onBeerCardCreate(beerToSubmit);
  };

  render() {
    const buttonText = this.props.dateAdded ? 'Edit' : 'Add';
    if (this.state.showEditForm) {
      return (
        <div>
          <EditForm
            onCancelClick={this.showEditForm}
            onClickAction={this.handleBeerCardAdd}
          />
        </div>
      );
    }

    return (
      <div>
        <BeerCard {...this.props} />
        <button onClick={this.showEditForm}>{buttonText}</button>
      </div>
    );
  }
}

export default EditableBeerCard;
