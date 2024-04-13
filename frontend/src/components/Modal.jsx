import ReactModal from 'react-modal';
import React, { createContext, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

const Modal = ({ children, isOpen, setIsOpen, ...props }) => {
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <ModalContext.Provider value={{ closeModal }}>
        <ReactModal style={customStyles} isOpen={isOpen} onRequestClose={closeModal} {...props}>
          {children}
        </ReactModal>
      </ModalContext.Provider>
    </>
  );
};

export default Modal;

ReactModal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 0,
    backgroundColor: 'transparent',
    padding: '0'
  },
  overlay: {
    backgroundColor: 'var(--modal-overlay-bg)'
  }
};
