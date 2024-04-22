import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';

import defaultPP from '../assets/profilePic.jpg';

const UserCard = ({ user }) => {
  return (
    <Container>
      <div className="profile-pic">
        <img src={user.profilePic || defaultPP} alt="Your profile picture" />
      </div>
      <div className="username-container">
        <div className="username">
          <span className="displayName">{user.displayName}</span>
          <span className="at">@{user.username}</span>
        </div>
        <Icon className="more-icon" icon="ph:dots-three-bold" />
      </div>
    </Container>
  );
};

export default UserCard;

const Container = styled.div`
  display: flex;

  margin-top: auto;
  align-self: stretch;

  border-radius: 5rem;
  transition: all 0.3s;
  padding: 1rem;
  cursor: pointer;
  gap: 1rem;

  & > .profile-pic {
    display: flex;
    align-items: center;
    max-width: 3rem;
    overflow: hidden;

    & img {
      border-radius: 50%;
      max-width: inherit;
      object-fit: contain;
    }
  }

  & > .username-container {
    flex-grow: 1;
    display: flex;
    align-items: center;
    gap: 1rem;

    & > .username {
      display: flex;
      flex-direction: column;
      font-size: 1.3rem;

      & > .displayName {
        font-weight: 700;
      }

      & > .at {
        color: var(--gray);
      }
    }

    & > .more-icon {
      font-size: 2rem;
      margin-left: auto;
    }
  }

  &:hover {
    background-color: rgba(231, 233, 234, 0.1);
  }
`;
