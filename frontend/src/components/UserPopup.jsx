import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAxios from 'axios-hooks';
import toast from 'react-hot-toast';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useCookies } from 'react-cookie';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

import { Button as DefaultButton } from './Actions';
import defaultPP from '../assets/profilePic.jpg';

const UserPopup = ({ user }) => {
  const [cookies] = useCookies(['_auth_state']);
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const signIn = useSignIn();
  const authHeader = useAuthHeader();
  const [isFollowing, setIsFollowing] = useState(auth.following.includes(user._id));
  const [authData, setAuthData] = useState(auth);

  const url = `${import.meta.env.VITE_API_URL}/users/${user._id}/${isFollowing ? 'unfollow' : 'follow'}`;

  const [, executeFollow] = useAxios({ method: 'PATCH', url, headers: { Authorization: authHeader } }, { manual: true });

  // Update data whenever cookie changes
  useEffect(() => {
    setAuthData(cookies._auth_state);
    setIsFollowing(isAuthenticated && cookies._auth_state ? cookies._auth_state.following.includes(user._id) : false);
  }, [cookies._auth_state]);

  const handleFollow = async () => {
    try {
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
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <Wrapper>
        <div className="header">
          <div className="profile-pic-container">
            <Link to={'/' + user.username}>
              <div className="profile-pic">
                <img src={user.profilePic || defaultPP} />
              </div>
            </Link>
            <Button onClick={handleFollow} $unfollow={isFollowing} $disabled={auth._id === user._id}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          </div>
          <div className="username">
            <Link to={'/' + user.username}>
              <span className="display-name">{user.displayName}</span>
              <span>@{user.username}</span>
            </Link>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default UserPopup;

const Wrapper = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--black);
  box-shadow:
    rgba(255, 255, 255, 0.2) 0px 0px 15px 0px,
    rgba(255, 255, 255, 0.15) 0px 0px 3px 1px;

  & > .header {
    & > .profile-pic-container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 3rem;

      & .profile-pic {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        & img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    & .username {
      font-size: 1.3rem;

      & > a {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        margin-top: 0.5rem;
      }

      & span.display-name {
        font-weight: 700;
        &:hover {
          text-decoration: underline;
        }
      }
      & span:last-child {
        color: var(--gray);
      }
    }
  }
`;

const Button = styled(DefaultButton)`
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  align-self: flex-start;
  font-weight: 700;

  background-color: ${(props) => (props.$unfollow ? 'var(--danger)' : null)};
  color: ${(props) => (props.$unfollow ? 'var(--light)' : null)};

  visibility: ${(props) => (props.$disabled ? 'hidden' : null)};

  &:hover {
    background-color: ${(props) => (props.$unfollow ? 'var(--danger-hover)' : null)};
  }
`;
