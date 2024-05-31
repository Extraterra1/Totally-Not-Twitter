import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const TweetShowcase = () => {
  const { tweetID } = useParams();

  const [{ loading, data, error }] = useAxios({ url: `${import.meta.env.VITE_API_URL}/tweets/${tweetID}`, method: 'GET' });

  return (
    <Container>
      <div className="header">
        <Icon className="back-icon" icon="ph:arrow-bend-up-left-bold" />
        <span>Tweet</span>
      </div>
      <div className="content">{tweetID}</div>
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
    }
  }
`;
