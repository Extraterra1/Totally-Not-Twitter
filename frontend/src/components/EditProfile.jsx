import Modal from './Modal';
import styled from 'styled-components';

const EditProfile = ({ setIsOpen, isOpen }) => {
  return (
    <Modal setIsOpen={setIsOpen} style={modalStyles} isOpen={isOpen}>
      <h1>hey</h1>
    </Modal>
  );
};

export default EditProfile;

const modalStyles = {
  content: {
    top: '2rem',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate( -50%)',
    border: 0,
    backgroundColor: 'transparent',
    padding: '0'
  },
  overlay: {
    backgroundColor: 'var(--modal-overlay-bg)'
  }
};
