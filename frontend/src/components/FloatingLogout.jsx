import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import { isAuthenticated } from 'react-auth-kit/utils/utils';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

const FloatingLogout = () => {
  return (
    <Button>
      <Icon icon="ph:sign-out" />
    </Button>
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
