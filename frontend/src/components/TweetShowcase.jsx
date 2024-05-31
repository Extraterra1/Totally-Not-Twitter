import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Tweet from './Tweet';

const TweetShowcase = () => {
  const { tweetID } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const [{ loading, data, error }] = useAxios({ url: `${import.meta.env.VITE_API_URL}/tweets/${tweetID}`, method: 'GET' });

  if (error)
    return (
      <Container>
        <div className="header">
          <Icon onClick={handleBackClick} className="back-icon" icon="ph:arrow-bend-up-left-bold" />
          <span>Tweet</span>
        </div>
        <div className="content">
          <div className="error-message">
            <span>Hmm...this page doesn't exist. Try searching for something else.</span>
            <Link className="search-button" to={'/search'}>
              Search
            </Link>
          </div>
        </div>
      </Container>
    );

  return (
    <Container>
      <div className="header">
        <Icon onClick={handleBackClick} className="back-icon" icon="ph:arrow-bend-up-left-bold" />
        <span>Tweet</span>
      </div>
      <div className="content">
        {loading ? (
          <ClipLoader className="spinner" loading={loading} color="var(--twitter-blue)" size={45} />
        ) : (
          <div className="tweet">{data.tweet.content}</div>
        )}
      </div>
    </Container>
  );
};

export default TweetShowcase;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--gray-dark);
  border-right: 1px solid var(--gray-dark);

  & > .header {
    display: flex;
    align-items: center;
    gap: 3rem;
    color: var(--light);
    padding: 1rem;

    & > span {
      font-size: 1.7rem;
      font-weight: 700;
    }

    & > .back-icon {
      font-size: 2rem;
      cursor: pointer;
    }
  }

  & > .content {
    display: flex;
    flex-direction: column;

    color: var(--light);

    & .spinner {
      align-self: center;
      margin-top: 3rem;
    }

    & > .error-message {
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 2rem;

      gap: 2rem;

      & > span {
        font-size: 1.5rem;
      }

      & > .search-button {
        padding: 0.5rem 1.5rem;
        background-color: var(--twitter-blue);
        border-radius: 2rem;
        align-self: center;
        font-size: 1.2rem;
        font-weight: 700;
      }
    }
  }
`;
