import styled from 'styled-components';
import TNTLogo from '../assets/ttn-logo.png';
import { useState } from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { Navigate } from 'react-router-dom';

import Modal from '../components/Modal';
import Actions from '../components/Actions';
import SmallPrint from '../components/SmallPrint';
import Register from '../components/Register';
import Login from '../components/Login';

const Landing = () => {
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const openRegisterModal = () => setRegisterModalIsOpen(true);
  const openLoginModal = () => setLoginModalIsOpen(true);
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      {isAuthenticated && <Navigate to="/timeline" />}
      <Modal isOpen={registerModalIsOpen} setIsOpen={setRegisterModalIsOpen} shouldCloseOnOverlayClick={false}>
        <Register />
      </Modal>
      <Modal isOpen={loginModalIsOpen} setIsOpen={setLoginModalIsOpen} shouldCloseOnOverlayClick={false}>
        <Login />
      </Modal>
      <Wrapper>
        <div className="logo-container">
          <img src={TNTLogo} alt="TNT Logo" />
        </div>
        <Actions openRegisterModal={openRegisterModal} openLoginModal={openLoginModal} />
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
