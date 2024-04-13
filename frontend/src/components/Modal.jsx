import ReactModal from 'react-modal';
import { useState } from 'react';

ReactModal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    backgroundColor: 'transparent'
  }
};

const Modal = ({ children, isOpen, setIsOpen, ...props }) => {
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <ReactModal style={customStyles} isOpen={isOpen} onRequestClose={closeModal} {...props}>
        {children}
      </ReactModal>
    </>
  );
};

export default Modal;
