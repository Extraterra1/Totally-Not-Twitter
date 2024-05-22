import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Icon } from '@iconify/react/dist/iconify.js';
import moment from 'moment';

import Tweet from './Tweet';

import profilePic from '../assets/profilePic.jpg';

const ProfileFeed = () => {
  const { username } = useParams();
  const [{ data, loading, error }] = useAxios({ url: `${import.meta.env.VITE_API_URL}/users/${username}`, method: 'GET' });
  const [{ data: tweetsData, loading: tweetsLoading }] = useAxios({ url: `${import.meta.env.VITE_API_URL}/users/${username}/tweets`, method: 'GET' });

  console.log(tweetsData);

  if (loading)
    return (
      <Wrapper>
        <ClipLoader className="spinner" loading={loading} color="var(--twitter-blue)" size={45} />
      </Wrapper>
    );

  // TODO: ERROR HANDLING

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
        <ClipLoader className="spinner" loading={tweetsLoading} color="var(--twitter-blue)" size={45} />
        {!loading && tweetsData.tweets.map((e) => <Tweet key={e._id} tweet={e} update={false} />)}
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
