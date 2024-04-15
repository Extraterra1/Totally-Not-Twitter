import styled from 'styled-components';
import TNTLogo from '../assets/ttn-logo.png';
import { useState } from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { Navigate } from 'react-router-dom';

import Modal from './Modal';
import Actions from './Actions';
import SmallPrint from './SmallPrint';
import Register from './Register';

const Landing = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      {isAuthenticated && <Navigate to="/timeline" />}
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} shouldCloseOnOverlayClick={false}>
        <Register />
      </Modal>
      <Wrapper>
        <div className="logo-container">
          <img src={TNTLogo} alt="TNT Logo" />
        </div>
        <Actions openModal={openModal} />
        <SmallPrint />
      </Wrapper>
    </>
  );
};

export default Landing;

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;

  align-items: center;

  background-color: var(--black);
  color: var(--light);

  & .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      max-width: 30vw;
    }
  }
`;
