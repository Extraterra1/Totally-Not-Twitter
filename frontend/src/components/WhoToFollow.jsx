import styled from 'styled-components';
import useAxios from 'axios-hooks';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useCookies } from 'react-cookie';

import defaultPP from '../assets/profilePic.jpg';
import { Button as DefaultButton } from './Actions';

const WhoToFollow = () => {
  const authHeader = useAuthHeader();
  const [{ loading, data, error }, refetchUsers] = useAxios({
    method: 'GET',
    url: `${import.meta.env.VITE_API_URL}/users/`,
    headers: { Authorization: authHeader }
  });

  if (error)
    return (
      <Container>
        <h4 className="title">Who to follow</h4>
        <div className="users">
          <ClipLoader className="spinner" loading={loading} size={30} color="var(--twitter-blue)" />
        </div>
      </Container>
    );

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

export const UserCard = ({ user }) => {
  const [cookies] = useCookies(['_auth_state']);
  const navigate = useNavigate();
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();

  const [isFollowing, setIsFollowing] = useState(isAuthenticated ? auth.following.includes(user._id) : false);
  const [authData, setAuthData] = useState(auth);

  const url = `${import.meta.env.VITE_API_URL}/users/${user._id}/${isFollowing ? 'unfollow' : 'follow'}`;

  const [, executeFollow] = useAxios({ method: 'PATCH', url, headers: { Authorization: authHeader } }, { manual: true });

  // Update data whenever cookie changes
  useEffect(() => {
    setAuthData(cookies._auth_state);
    setIsFollowing(isAuthenticated ? cookies._auth_state.following.includes(user._id) : false);
  }, [cookies._auth_state]);

  const handleFollow = async (e) => {
    try {
      e.stopPropagation();
      e.preventDefault();
      const res = await executeFollow();
      signIn({
        auth: {
          token: res.data.token,
          type: 'Bearer'
        },
        userState: res.data.follower
      });
      toast.success(`${isFollowing ? `Unfollowed @${user.username}` : `Followed @${user.username}`}`);
      setIsFollowing(!isFollowing);
    } catch (err) {
      if (err.message === 'canceled') return toast.error(isFollowing ? `You already unfollowed @${user.username}` : `You already follow @${user.username}`);
      toast.error('Something went wrong');
    }
  };

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
        <Button onClick={handleFollow} $unfollow={isFollowing} $disabled={!isAuthenticated || auth._id === user._id}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
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
    justify-content: space-between;
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

const Button = styled(DefaultButton)`
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  align-self: flex-start;
  font-weight: 700;
  min-width: 8rem;

  background-color: ${(props) => (props.$unfollow ? 'var(--danger)' : null)};
  color: ${(props) => (props.$unfollow ? 'var(--light)' : null)};

  visibility: ${(props) => (props.$disabled ? 'hidden' : null)};

  &:hover {
    background-color: ${(props) => (props.$unfollow ? 'var(--danger-hover)' : null)};
  }
`;
