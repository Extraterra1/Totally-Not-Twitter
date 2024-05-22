import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Icon } from '@iconify/react/dist/iconify.js';
import moment from 'moment';
import { useState } from 'react';

import Tweet from './Tweet';

import profilePic from '../assets/profilePic.jpg';

const ProfileFeed = () => {
  const { username } = useParams();
  const [{ data, loading, error }] = useAxios({ url: `${import.meta.env.VITE_API_URL}/users/${username}`, method: 'GET' });
  const [{ data: tweetsData, loading: tweetsLoading }] = useAxios(
    { url: `${import.meta.env.VITE_API_URL}/users/${username}/tweets`, method: 'GET' },
    { useCache: false }
  );
  const [{ data: likesData, loading: likesLoading }, fetchLikes] = useAxios(
    { url: `${import.meta.env.VITE_API_URL}/users/${username}/liked`, method: 'GET' },
    { manual: true }
  );

  const [activeMenu, setActiveMenu] = useState('tweets');

  const handleMenuClick = async () => {
    if (activeMenu === 'tweets') {
      if (!likesData) await fetchLikes();
      setActiveMenu('likes');
    } else {
      setActiveMenu('tweets');
    }
  };

  if (loading)
    return (
      <Wrapper>
        <ClipLoader className="spinner" loading={loading} color="var(--twitter-blue)" size={45} />
      </Wrapper>
    );

  // TODO: FOLLOW BUTTON

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
              <h2>This account doesn't exist</h2>
              <span>Try searching for another.</span>
            </div>
          </div>
        </div>
      </Wrapper>
    );

  return (
    <Wrapper>
      <div className="header">
        <div className="profile-pic">
          <img src={data.user.profilePic || profilePic} />
          <Button>Follow</Button>
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
        <ClipLoader className="spinner" loading={tweetsLoading} color="var(--twitter-blue)" size={45} />
        {!tweetsLoading && tweetsData && activeMenu === 'tweets' && tweetsData.tweets.map((e) => <Tweet key={e._id} tweet={e} update={false} />)}
        {!likesLoading && likesData && activeMenu === 'likes' && likesData.tweets.map((e) => <Tweet key={e._id} tweet={e} update={false} />)}
        {!tweetsLoading && (tweetsData?.tweets?.length === 0 || likesData?.tweets?.length === 0) && <h2 className="no-tweets">Nothing to see here...</h2>}
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
  background-color: var(--light);
  color: var(--dark);
  padding: 0.5rem 2rem;
  font-weight: 700;
  border-radius: 2rem;
  font-size: 1.5rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: var(--light-hover);
  }
`;
