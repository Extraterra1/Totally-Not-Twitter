import styled from 'styled-components';
import { Link } from 'react-router-dom';

import getTimeSinceTweet from '../utils/getTimeSinceTweet';
import defaultPP from '../assets/profilePic.jpg';

const Tweet = ({ tweet }) => {
  return (
    <>
      <Container>
        <div className="profile-pic">
          <img src={tweet.author.profilePic || defaultPP} alt={`${tweet.author.displayName} Profile Picture`} />
        </div>
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

  & > .profile-pic {
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
          color: var(--gray-dark);
        }
      }
    }
  }
`;
