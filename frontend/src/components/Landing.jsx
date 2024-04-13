import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import TNTLogo from '../assets/ttn-logo.png';
import { useState } from 'react';

import Modal from './Modal';
import Actions from './Actions';

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
        <div className="small-print">
          <span>About</span>
          <span>Download the TNT App</span>
          <span>Help Center</span>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Cookie Policy</span>
          <span>Accesibility</span>
          <span>Ads Info</span>
          <span>Blog</span>
          <span>Careers</span>
          <span>Brand Resources</span>
          <span>Advertising</span>
          <span>Marketing</span>
          <span>TNT for Business</span>
          <span>Developers</span>
          <span>Directory</span>
          <span>Settings</span>
          <span>© 2024 TNT Corp.</span>
        </div>
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

  & > .actions-container {
    & .cta {
      font-family: 'ChirpExtended';
      font-weight: 900;
      line-height: 13rem;

      & > h1 {
        font-size: 6rem;
      }

      & > h2 {
        font-size: 3rem;
      }
    }

    & .actions {
      display: flex;
      flex-direction: column;
      align-items: start;

      & .buttons {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      & .separator {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 2rem;

        align-self: stretch;
        font-size: 1.5rem;
      }

      & .sign-in {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        & span {
          font-size: 1.3rem;
          font-weight: 700;
        }
      }
    }
  }

  & > .small-print {
    display: flex;
    grid-column: span 2;

    gap: 1.5rem;
    justify-content: center;
    padding: 1rem;
    color: #71767b;

    & > span:not(:last-child):hover {
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 0.2rem;
    }
  }
`;

const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0;

  gap: 1rem;

  padding: 1rem 5rem;
  background-color: ${(props) => (props.$primary ? 'var(--twitter-blue)' : props.$negative ? 'var(--black)' : 'var(--white)')};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => (props.$primary ? 'var(--light)' : props.$negative ? 'var(--twitter-blue)' : 'var(--black)')};
  border-radius: 3rem;
  cursor: pointer;
  transition: all 0.3s;
  border: ${(props) => (props.$negative ? '1px solid var(--gray)' : null)};

  & > .btn-icon {
    font-size: 3rem;
  }

  &:hover {
    background-color: ${(props) => (props.$primary ? 'var(--twitter-blue-hover)' : props.$negative ? 'rgba(29,155,240,0.09)' : '#eaeaea')};
  }
`;

const Line = styled.div`
  height: 1px;
  background-color: var(--gray);
`;

// TODOS
// MODALS
