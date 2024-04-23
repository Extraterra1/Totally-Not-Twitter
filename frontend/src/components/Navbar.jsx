import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import TTNLogo from '../assets/ttn-logo.png';
import UserCard from '../components/UserCard';
import { Button as BaseButton } from '../components/Actions';

const Navbar = () => {
  const auth = useAuthUser();
  return (
    <Sidebar>
      <div className="sidebar">
        <Link to="/timeline">
          <div className="logo">
            <img src={TTNLogo} alt="TTN Logo" />
          </div>
        </Link>
        <Link to="/timeline">
          <div className="item">
            <Icon icon="ph-house-fill" />
            <span>Home</span>
          </div>
        </Link>
        <Link to="/explore">
          <div className="item">
            <Icon icon="ph:magnifying-glass-bold" />
            <span>Explore</span>
          </div>
        </Link>
        <Link to="/profile">
          <div className="item">
            <Icon icon="ph:user-fill" />
            <span>Profile</span>
          </div>
        </Link>
        <Button $primary>Post</Button>
        <UserCard user={auth} />
      </div>
    </Sidebar>
  );
};

export default Navbar;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 1rem;
  height: 100vh;

  & > .sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: start;
    min-width: 20rem;
    height: inherit;

    color: var(--light);

    & .logo {
      padding: 1rem;
      max-width: 6rem;

      & > img {
        max-width: inherit;
      }
    }

    & .item {
      display: flex;
      align-items: center;
      gap: 1rem;

      font-size: 2rem;
      transition: all 0.3s;
      padding: 1rem 3rem 1rem 1rem;
      border-radius: 5rem;
      cursor: pointer;

      & > span {
        font-weight: 700;
      }

      &:hover {
        background-color: rgba(231, 233, 234, 0.1);
      }
    }
  }
`;

const Button = styled(BaseButton)`
  align-self: stretch;
`;
