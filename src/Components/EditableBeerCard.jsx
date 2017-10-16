// @ flow

import * as React from 'react';
import ActionButtons from './ActionButtons';
import BeerCard from './BeerCard';
import DetailCard from './DetailCard';
import EditForm from './EditForm';
import { formatBeerToSubmit } from '../client-helpers';

type Props = {
  _id: string,
  abv: string,
  dateAdded?: string,
  description: string,
  id: string,
  ibu: string,
  imgUrl: string,
  name: string,
  notes?: string,
  onBeerCardCreate: Function,
  onBeerCardDelete: Function,
  onBeerCardEdit: Function,
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
          <EditForm _id={this.props._id} onCancelClick={this.showEditForm} onSubmitAction={onSubmitAction} />
        </div>
      );
    }

    let card;
    if (this.props.showDetailCard) {
      card = <DetailCard {...this.props} />;
    } else {
      card = <BeerCard {...this.props} />;
    }

    return (
      <div>
        {card}
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
