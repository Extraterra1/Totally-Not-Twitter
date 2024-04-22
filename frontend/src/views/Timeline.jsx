import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';

import TTNLogo from '../assets/ttn-logo.png';
import { Button as BaseButton } from '../components/Actions';

const Timeline = () => {
  return (
    <>
      <Wrapper>
        <SidebarContainer>
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
          </div>
        </SidebarContainer>
      </Wrapper>
    </>
  );
};

export default Timeline;

const Wrapper = styled.main`
  background-color: var(--black);

  display: grid;
  grid-template-columns: 5fr 3fr 5fr;
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 1rem;

  & > .sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: start;
    min-width: 20rem;

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
      padding: 1rem;
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
  /* background-color: var(--twitter-blue);
  color: var(--white); */
  align-self: stretch;
`;
