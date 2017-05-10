/* @flow */
import React from 'react';
import Dialog from '../Dialog';
import type { ReactChildren } from '../../types/react.js.flow';
import Paper from '../Paper';

type Props = {
  onClose: () => void,
  onAfterOpen: () => void,
  children: ReactChildren,
  visible: boolean,
  closeable: boolean,
  title: string,
};
const Modal = (props: Props) => {
  return (
    <Dialog
      aria-labelledby="contentModal"
      contentLabel="contentModal"
      isOpen={props.visible}
      closeable={props.closeable}
      onClose={props.onClose}
      onAfterOpen={props.onAfterOpen}
      title={props.title}
    >
      {props.children}

    </Dialog>
  );
};

export default Modal;
