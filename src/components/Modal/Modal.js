/* @flow */
import React from 'react';
import Button from 'react-md/lib/Buttons';
import Dialog from '../Dialog';
import type { ReactChildren } from '../../types/react.js.flow';
import Paper from '../Paper';

type Props = {
  onClose: () => void,
  onAfterOpen: () => void,
  children: ReactChildren,
  visible: boolean,
  overlay: boolean,
};
const Modal = (props: Props) => {
  return (
    <Dialog
      overlay={props.overlay}
      aria-labelledby="contentModal"
      contentLabel="contentModal"
      isOpen={props.visible}
      onRequestClose={props.onClose}
      onAfterOpen={props.onAfterOpen}
      modal
    >
      <Paper zDepth={0}>
        <Button
          icon
          style={{ float: 'right', marginTop: '10px', marginRight: '10px' }}
          onClick={props.onClose}
        >
          close
        </Button>

        {props.children}

      </Paper>
    </Dialog>
  );
};

export default Modal;
