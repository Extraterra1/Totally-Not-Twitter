import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import getTimeSinceTweet from '../utils/getTimeSinceTweet';
import defaultPP from '../assets/profilePic.jpg';

const Tweet = ({ tweet }) => {
  const auth = useAuthUser();
  const [isLiked, setIsLiked] = useState(tweet.likes.includes(auth._id));
  const [isRetweeted, setIsRetweeted] = useState(false);

  return (
    <>
      <Container>
        <Link to={`/${tweet.author.username}`}>
          <div className="profile-pic">
            <img src={tweet.author.profilePic || defaultPP} alt={`${tweet.author.displayName} Profile Picture`} />
          </div>
        </Link>
        <div className="content">
          <div className="username">
            <Link to={`/${tweet.author.username}`}>
              <div>
                <span>{tweet.author.displayName}</span>
                <span>@{tweet.author.username}</span>
                <span>·</span>
                <span>{getTimeSinceTweet(tweet.createdAt)}</span>
              </div>
            </Link>
          </div>
          <div className="text">{tweet.content}</div>
          <div className="actions">
            <Link to={`/tweets/${tweet._id}`}>
              <span>
                <Icon className="replies-icon" icon="bx:message-rounded" />
              </span>
            </Link>
            <span>
              <Icon className={`retweet-icon ${isRetweeted ? 'fill' : null}`} icon="bx:repost" />
            </span>
            <span>
              <Icon className={`like-icon ${isLiked ? 'fill' : null}`} icon={isLiked ? 'bxs-heart' : 'bx:heart'} />
              <span>{tweet.likes.length || null}</span>
            </span>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Tweet;

const Container = styled.div`
  border-bottom: 1px solid var(--gray-dark);
  padding: 1rem;

  display: grid;
  grid-template-columns: auto 1fr;

  color: var(--light);
  font-size: 1.5rem;

  & .profile-pic {
    display: flex;
    align-items: start;
    max-width: 3rem;
    overflow: hidden;

    & img {
      border-radius: 50%;
      max-width: inherit;
      object-fit: contain;
    }
  }

  & > .content {
    margin-left: 1rem;
    & > .username {
      & div {
        display: flex;
        gap: 0.5rem;

        & > span:first-child {
          font-weight: 700;

          &:hover {
            text-decoration: underline;
            text-underline-offset: 2px;
          }
        }

        & > span:not(:first-child) {
          color: var(--gray);
        }
      }
    }
    & > .actions {
      display: flex;
      justify-content: space-around;

      margin-top: 1rem;
      font-size: 1.6rem;
      color: var(--gray);

      & > span {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        & > span {
          font-size: 1.4rem;
        }
      }

      & .replies-icon,
      .retweet-icon,
      .like-icon {
        transition: all 0.3s;
        cursor: pointer;
      }

      & .like-icon.fill {
        color: var(--like-red);
      }
      & .retweet-icon.fill {
        color: var(--success);
      }

      & .replies-icon:hover {
        color: var(--twitter-blue);
      }
      & .retweet-icon:hover {
        color: var(--success);
      }
      & .like-icon:hover {
        color: var(--like-red);
      }
    }
  }
`;
