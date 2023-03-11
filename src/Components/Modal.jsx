import React from 'react';
import styles from './modal.module.css';
const Modal = ({ message }) => {
  const open = message ? true : false;
  return (
    <dialog className={styles.modal} open={open}>
      <p>{message}</p>
    </dialog>
  );
};

export default Modal;
