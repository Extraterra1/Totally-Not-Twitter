import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';

const FloatingLogout = () => {
  return (
    <Button>
      <Icon icon="ph:sign-out" />
    </Button>
  );
};

export default FloatingLogout;

const Button = styled.a`
  position: fixed;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  color: var(--light);
  background-color: var(--twitter-blue);

  display: flex;
  justify-content: center;
  align-items: center;
`;
