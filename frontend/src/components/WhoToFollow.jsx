import styled from 'styled-components';
import useAxios from 'axios-hooks';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { ClipLoader } from 'react-spinners';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';

import defaultPP from '../assets/profilePic.jpg';

const WhoToFollow = () => {
  const authHeader = useAuthHeader();
  const [{ loading, data }] = useAxios({ method: 'GET', url: `${import.meta.env.VITE_API_URL}/users/`, headers: { Authorization: authHeader } });
  console.log(data);

  return (
    <Container>
      <h4 className="title">Who to follow</h4>
      <div className="users">
        <ClipLoader className="spinner" loading={loading} size={30} color="var(--twitter-blue)" />
        {!loading && data.map((e) => <UserCard key={e._id} user={e} />)}
      </div>
    </Container>
  );
};

export default WhoToFollow;

const Container = styled.div`
  border: 1px solid var(--gray-dark);
  border-radius: 2rem;
  width: 100%;
  padding: 1rem;

  & > h4.title {
    color: var(--light);
    font-size: 1.8rem;
  }

  & > .users {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    color: var(--light);

    & > .spinner {
      align-self: center;
    }
  }
`;

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <UCContainer onClick={() => navigate(`/${user.username}`)}>
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
    </UCContainer>
  );
};

const UCContainer = styled.div`
  display: flex;

  border-radius: 5rem;
  transition: all 0.3s;
  padding: 1rem;
  cursor: pointer;
  gap: 1rem;

  position: relative;

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
