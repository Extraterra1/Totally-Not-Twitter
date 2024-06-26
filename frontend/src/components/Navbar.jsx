import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

import { useGlobal } from '../Router';

import TTNLogo from '../assets/ttn-logo.png';
import UserCard from '../components/UserCard';
import { Button as BaseButton } from '../components/Actions';

const Navbar = () => {
  const auth = useAuthUser();
  const [cookies] = useCookies(['_auth_state']);
  const isAuthenticated = useIsAuthenticated();
  const { openTweetModal } = useGlobal();

  const [authData, setAuthData] = useState(auth);

  useEffect(() => {
    if (cookies._auth_state?.username !== auth?.username) setAuthData(auth);
  });

  //Update data whenever cookie changes
  useEffect(() => {
    if (cookies._auth_state) setAuthData(cookies._auth_state);
  }, [cookies._auth_state]);

  return (
    <>
      <Wrapper>
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
            {isAuthenticated ? (
              <Link to={isAuthenticated ? `/${authData.username}` : null}>
                <div className="item">
                  <Icon icon="ph:user-fill" />
                  <span>Profile</span>
                </div>
              </Link>
            ) : null}
            <Button onClick={() => openTweetModal()} $primary $disabled={!isAuthenticated}>
              Post
            </Button>
            {isAuthenticated && <UserCard user={authData} />}
          </div>
        </Sidebar>
      </Wrapper>
    </>
  );
};

export default Navbar;

const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Sidebar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 1rem;
  height: 100vh;

  @media screen and (max-width: 500px) {
    border-top: 1px solid var(--gray-dark);
    width: 100%;
    z-index: 10;
    padding: 1rem 0;
  }

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

  @media screen and (max-width: 500px) {
    position: fixed;
    bottom: 0;
    height: auto;
    align-items: center;
    background-color: var(--black);

    & > .sidebar {
      flex-direction: row;
      min-width: auto;

      & .logo,
      & > div {
        display: none;
      }
    }
  }
`;

const Button = styled(BaseButton)`
  align-self: stretch;

  visibility: ${(props) => (props.$disabled ? 'hidden' : null)};

  @media screen and (max-width: 500px) {
    display: none;
  }
`;
