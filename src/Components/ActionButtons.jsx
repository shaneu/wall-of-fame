// @ flow

import * as React from 'react';

type Props = {
  onDeleteClick: Function,
  onEditClick: Function,
  showEditButton: boolean,
};

function ActionButtons(props: Props) {
  const buttonText = props.showEditButton ? 'Edit' : 'Add';
  return (
    <div>
      <button onClick={props.onEditClick}>{buttonText}</button>
      {props.showEditButton && (
        <button onClick={props.onDeleteClick}>Delete</button>
      )}
    </div>
  );
}

export default ActionButtons;
