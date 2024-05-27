import Modal from './Modal';
import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';

const EditProfile = ({ setIsOpen, isOpen }) => {
  const closeModal = () => setIsOpen(false);

  return (
    <Modal setIsOpen={setIsOpen} style={modalStyles} isOpen={isOpen}>
      <Wrapper>
        <Icon onClick={closeModal} className="close-icon" icon="ph:x-bold" />
      </Wrapper>
    </Modal>
  );
};

export default EditProfile;

const Wrapper = styled.div`
  background-color: var(--black);
  min-width: 30vw;
  border-radius: 1.5rem;
  padding: 2rem 1rem;

  position: relative;

  & > .close-icon {
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--gray-light);
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;

    &:hover {
      color: var(--gray);
      transition: all 0.1s;
    }
  }
`;

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
