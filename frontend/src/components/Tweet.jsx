import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
            <span>{tweet.author.displayName}</span>·<span>@{tweet.author.username}</span>
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
      display: flex;
      gap: 0.5rem;

      & > span:first-child {
        font-weight: 700;
      }

      & > span:not(:first-child) {
        color: var(--gray-dark);
      }
    }
  }
`;
