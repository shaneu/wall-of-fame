// @ flow

import * as React from 'react';

type Props = {
  rating?: string,
  notes?: string,
};

class EditForm extends React.Component<void, Props, void> {
  state = {
    rating: this.props.rating || '0',
    notes: this.props.notes || '',
  };

  handleRating = e => {
    this.setState({
      rating: e.target.value,
    });
  };

  handleNotes = e => {
    this.setState({
      notes: e.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const userInput = {
      _id: this.props._id,
      notes: this.state.notes,
      rating: this.state.rating,
    };

    this.props.onSubmitAction(userInput);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="rating">Rating:</label>
          <input type="number" id="rating" min="0" max="5" onChange={this.handleRating} value={this.state.rating} />
          <label htmlFor="notes">Notes:</label>
          <textarea id="notes" onChange={this.handleNotes} value={this.state.notes} />
          <button type="submit">{'\u2714'}</button>
          <button type="button" onClick={this.props.onCancelClick}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default EditForm;
