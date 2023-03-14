import React from 'react';
const Modal = ({ message }) => {
  const open = message ? true : false;
  return (
    <div className="modal" open={open}>
      <div className="modal-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
