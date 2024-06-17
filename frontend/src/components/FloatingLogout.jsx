import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import Modal from './Modal';
import { useState } from 'react';
import { modalStyles } from './Tweet';
import { useNavigate } from 'react-router-dom';

const FloatingLogout = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const signOut = useSignOut();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => (isAuthenticated ? setIsOpen(true) : null);

  const handleSignOut = () => {
    if (isAuthenticated) signOut();
    navigate('/');
  };
  const closeModal = () => setIsOpen(false);

  if (!isAuthenticated) return;

  return (
    <>
      <Modal setIsOpen={setIsOpen} isOpen={isOpen} style={modalStyles}>
        <Container>
          <div className="title">
            <h4>Sign Out?</h4>
          </div>
          <div className="actions">
            <button onClick={handleSignOut} className="accept btn">
              Confirm
            </button>
            <button onClick={closeModal} className="cancel btn">
              Cancel
            </button>
          </div>
        </Container>
      </Modal>
      <Button onClick={handleClick}>
        <Icon icon="ph:sign-out" />
      </Button>
    </>
  );
};

export default FloatingLogout;

const Button = styled.a`
  visibility: hidden;
  display: none;

  position: fixed;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  color: var(--light);
  background-color: var(--twitter-blue);

  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 10vh;
  right: 5vw;

  font-size: 4rem;
  cursor: pointer;

  &:hover {
    background-color: var(--twitter-blue-hover);
  }

  @media screen and (max-width: 800px) {
    visibility: visible;
    display: auto;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--light);
  padding: 2rem;
  gap: 2rem;

  & > .title {
    font-size: 5rem;
    margin: 0 auto;
  }

  & > .actions {
    display: flex;
    gap: 2rem;
    margin: 0 auto;
    & .btn {
      font-size: 2rem;
    }
    & .accept {
      background-color: var(--danger);
    }
  }
`;
