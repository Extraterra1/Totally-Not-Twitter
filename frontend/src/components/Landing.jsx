import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import TNTLogo from '../assets/ttn-logo.png';
import { useState } from 'react';

import Modal from './Modal';
import Actions from './Actions';
import SmallPrint from './SmallPrint';

const Landing = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);

  return (
    <>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} shouldCloseOnOverlayClick={false}>
        <h1>heyyy</h1>
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

// TODOS
// MODALS
