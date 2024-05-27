import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Icon } from '@iconify/react/dist/iconify.js';
import moment from 'moment';
import { useState, useEffect } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import toast from 'react-hot-toast';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

import Tweet from './Tweet';
import EditProfile from './EditProfile';

import profilePic from '../assets/profilePic.jpg';

const ProfileFeed = () => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const isAuthenticated = useIsAuthenticated();
  const signIn = useSignIn();
  const { username } = useParams();

  const [isFollowing, setIsFollowing] = useState(null);
  const [activeMenu, setActiveMenu] = useState('tweets');
  const [isOpen, setIsOpen] = useState(true);

  const [{ data, loading, error }] = useAxios({ url: `${import.meta.env.VITE_API_URL}/users/${username}`, method: 'GET' });
  const [{ data: tweetsData, loading: tweetsLoading }] = useAxios(
    { url: `${import.meta.env.VITE_API_URL}/users/${username}/tweets`, method: 'GET' },
    { useCache: false }
  );
  const [{ data: likesData, loading: likesLoading }, fetchLikes] = useAxios({ url: `${import.meta.env.VITE_API_URL}/users/${username}/liked`, method: 'GET' });
  const [, executeFollow] = useAxios({ method: 'PATCH', headers: { Authorization: authHeader } }, { manual: true });

  useEffect(() => {
    if (data && isAuthenticated) setIsFollowing(auth.following.includes(data.user._id));
  }, [data]);

  const handleMenuClick = async () => {
    if (activeMenu === 'tweets') {
      setActiveMenu('likes');
    } else {
      setActiveMenu('tweets');
    }
  };

  const handleFollow = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/users/${data.user._id}/${isFollowing ? 'unfollow' : 'follow'}`;
      const res = await executeFollow({ url });
      signIn({
        auth: {
          token: res.data.token,
          type: 'Bearer'
        },
        userState: res.data.follower
      });
      toast.success(`${isFollowing ? `Unfollowed @${data.user.username}` : `Followed @${data.user.username}`}`);
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const handleEdit = () => setIsOpen(true);

  if (loading)
    return (
      <Wrapper>
        <ClipLoader className="spinner" loading={loading} color="var(--twitter-blue)" size={45} />
      </Wrapper>
    );

  const selfProfile = isAuthenticated ? auth._id === data.user._id : false;

  if (error)
    return (
      <Wrapper>
        <div className="header">
          <div className="profile-pic not-found">
            <img src={profilePic} />
          </div>
          <div className="user-info">
            <span className="displayName">@{username}</span>
          </div>
        </div>
        <div className="feed">
          <div className="error-message">
            <div className="message-container">
              <h2>{error?.response?.status === 404 ? "This account doesn't exist" : 'Something went wrong'}</h2>
              <span>Please try again.</span>
            </div>
          </div>
        </div>
      </Wrapper>
    );

  return (
    <Wrapper>
      {selfProfile ? <EditProfile setIsOpen={setIsOpen} isOpen={isOpen} /> : null}
      <div className="header">
        <div className="profile-pic">
          <img src={data.user.profilePic || profilePic} />
          <Button onClick={selfProfile ? handleEdit : handleFollow} $unfollow={isFollowing} $edit={selfProfile} $disabled={!isAuthenticated}>
            {selfProfile ? 'Edit Profile' : isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        </div>
        <div className="user-info">
          <span className="displayName">{data.user.displayName}</span>
          <span className="username">@{data.user.username}</span>
          <span className="joined">
            <Icon icon="ph:calendar-blank" />
            <span>Joined {moment(data.user.createdAt).format('MMMM yyyy')}</span>
          </span>
          <div className="follow-data">
            <span className="number">
              {data.user.following} <span>Following</span>
            </span>
            <span className="number">
              {data.user.followers} <span>Followers</span>
            </span>
          </div>
        </div>
      </div>
      <div className="feed">
        <div className="header">
          <span onClick={handleMenuClick} className={activeMenu === 'tweets' ? 'active' : null}>
            Tweets
          </span>
          <span onClick={handleMenuClick} className={activeMenu === 'likes' ? 'active' : null}>
            Likes
          </span>
        </div>
        <ClipLoader className="spinner" loading={activeMenu === 'tweets' && tweetsLoading} color="var(--twitter-blue)" size={45} />
        {!tweetsLoading && tweetsData && activeMenu === 'tweets' && tweetsData.tweets.map((e) => <Tweet key={e._id} tweet={e} update={false} />)}
        {!likesLoading && likesData && activeMenu === 'likes' && likesData.tweets.map((e) => <Tweet key={e._id} tweet={e} update={false} />)}
        {!tweetsLoading && activeMenu === 'tweets' && tweetsData?.tweets?.length === 0 && <h2 className="no-tweets">Nothing to see here...</h2>}
        {!likesLoading && activeMenu === 'likes' && likesData?.tweets?.length === 0 && <h2 className="no-tweets">Nothing to see here...</h2>}
      </div>
    </Wrapper>
  );
};

export default ProfileFeed;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--gray-dark);
  border-right: 1px solid var(--gray-dark);

  & .spinner {
    align-self: center;
    margin-top: 3rem;
  }

  & > .header {
    border-bottom: 1px solid var(--gray-dark);

    & > .profile-pic {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      background-color: var(--twitter-blue);

      padding: 2rem;

      &.not-found {
        background-color: var(--gray);
      }

      & > img {
        width: 10rem;
        border-radius: 50%;

        border: 4px solid black;

        object-fit: cover;
      }
    }

    & > .user-info {
      display: flex;
      flex-direction: column;
      padding: 2rem;

      & > span.displayName {
        font-weight: 700;
        color: var(--light);
        font-size: 2rem;
      }

      & > span.username {
        color: var(--gray);
        font-size: 1.5rem;
      }

      & > span.joined {
        display: flex;
        gap: 1rem;
        align-items: center;

        color: var(--gray);
        font-size: 1.5rem;
        margin-top: 2rem;
      }

      & > .follow-data {
        display: flex;
        gap: 2rem;
        font-size: 1.5rem;
        margin-top: 1rem;

        & > span.number {
          color: var(--white);
          font-weight: 700;

          & > span {
            color: var(--gray);
            font-weight: 400;
          }
        }
      }
    }
  }

  & > .feed {
    display: flex;
    flex-direction: column;

    & > .error-message {
      color: var(--light);
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      margin-top: 10rem;
      font-size: 1.7rem;

      & > .message-container {
        grid-column: 2/3;

        & > span {
          color: var(--gray);
        }
      }
    }

    & > .header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      color: var(--gray);
      font-size: 1.5rem;
      border-bottom: 1px solid var(--gray-dark);

      & > span {
        padding: 1rem;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;

        &.active {
          color: var(--light);
          font-weight: 700;
          border-bottom: 2px solid var(--twitter-blue);
        }

        &:first-child {
          border-right: 1px solid var(--gray-dark);
        }

        &:hover {
          background-color: var(--gray);
          color: var(--gray-light);
        }
      }
    }

    & > h2.no-tweets {
      color: var(--light);
      font-size: 1.5rem;
      margin: 5rem auto;
    }
  }
`;

const Button = styled.a`
  background-color: ${(props) => (props.$unfollow ? 'var(--danger)' : props.$edit ? 'var(--black)' : 'var(--light)')};
  color: ${(props) => (props.$unfollow || props.$edit ? 'var(--light)' : 'var(--dark)')};
  padding: 0.5rem 2rem;
  font-weight: 700;
  border-radius: 2rem;
  font-size: 1.5rem;
  transition: all 0.2s;
  cursor: pointer;
  border: 2px solid transparent;
  border-color: ${(props) => (props.$edit ? 'var(--light)' : null)};

  visibility: ${(props) => (props.$disabled ? 'hidden' : null)};

  &:hover {
    background-color: ${(props) => (props.$unfollow ? 'var(--danger-hover)' : props.$edit ? '#222222' : 'var(--light-hover)')};
  }
`;
