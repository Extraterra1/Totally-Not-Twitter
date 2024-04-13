import { Icon } from '@iconify/react/dist/iconify.js';
import styled from 'styled-components';

import { useModal } from './Modal';

import TNTLogo from '../assets/ttn-logo.png';

const Register = () => {
  const { closeModal } = useModal();
  return (
    <Wrapper>
      <Header>
        <Icon onClick={closeModal} className="close-icon" icon="ph:x-bold" />
        <div className="img">
          <img src={TNTLogo} alt="TNT Logo" />
        </div>
      </Header>
      <Content>
        <h1>HEYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY</h1>
      </Content>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--black);
  padding: 1rem;
  border-radius: 1rem;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  color: var(--light);

  & > .img {
    flex-grow: 1;
    margin: 0 auto;
    max-width: 5rem;

    & > img {
      max-width: inherit;
      object-fit: cover;
    }
  }

  & > .close-icon {
    font-size: 2rem;
    cursor: pointer;

    &:hover {
      color: var(--gray-light);
      transition: all 0.1s;
    }
  }
`;

const Content = styled.div`
  padding: 0 5rem;
`;
