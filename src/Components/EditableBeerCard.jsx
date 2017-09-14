// @ flow

import * as React from 'react';
import ActionButtons from './ActionButtons';
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

  handleBeerCardEdit = userInput => {
    this.showEditForm();
    this.props.onBeerCardEdit(userInput);
  };

  handleDelete = () => {
    this.props.onBeerCardDelete(this.props.id);
  };

  render() {
    if (this.state.showEditForm) {
      let onSubmitAction;
      if (this.props.dateAdded) {
        onSubmitAction = this.handleBeerCardEdit;
      } else {
        onSubmitAction = this.handleBeerCardAdd;
      }

      return (
        <div>
          <EditForm
            id={this.props.id}
            onCancelClick={this.showEditForm}
            onSubmitAction={onSubmitAction}
          />
        </div>
      );
    }

    return (
      <div>
        <BeerCard {...this.props} />
        <ActionButtons
          showEditButton={!!this.props.dateAdded}
          onEditClick={this.showEditForm}
          onDeleteClick={this.handleDelete}
        />
      </div>
    );
  }
}

export default EditableBeerCard;
