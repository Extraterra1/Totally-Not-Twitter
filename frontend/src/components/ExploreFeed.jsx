import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { ClipLoader } from 'react-spinners';

import SearchBox from './SearchBox';
import Tweet from './Tweet';

const ExploreFeed = () => {
  const [{ data, loading, error }, refetchTweets] = useAxios({
    url: `${import.meta.env.VITE_API_URL}/explore`,
    method: 'GET'
  });

  return (
    <Wrapper>
      <div className="search-box">
        <SearchBox />
      </div>
      <div className="feed">
        <div className="header">
          <h1>Explore the latest tweets</h1>
        </div>
        <ClipLoader className="spinner" loading={loading} color="var(--twitter-blue)" size={45} />
        <div className="content">{!loading && data && data.tweets.map((e) => <Tweet key={e._id} tweet={e} update={false} />)}</div>
        {error && <h2 className="no-tweets">Something went wrong</h2>}
      </div>
    </Wrapper>
  );
};

export default ExploreFeed;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--gray-dark);
  border-right: 1px solid var(--gray-dark);

  @media screen and (max-width: 500px) {
    border: 0;
  }

  & .spinner {
    align-self: center;
    margin-top: 3rem;
  }

  & > .search-box {
    display: flex;
    align-items: center;
    justify-content: stretch;
    width: 100%;
    padding: 1rem;

    & > div {
      max-width: 100%;
      width: 100%;
      margin: 0;
    }
  }

  & > .feed {
    display: flex;
    flex-direction: column;

    & > .header {
      color: var(--light);
      padding: 1rem;
      border-bottom: 1px solid var(--gray-dark);
    }

    & > h2.no-tweets {
      color: var(--light);
      font-size: 1.5rem;
      margin: 5rem auto;
    }

    & > .content {
      color: var(--light);
    }
  }
`;
