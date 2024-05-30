import styled from 'styled-components';

import SearchBox from './SearchBox';

const ExploreFeed = () => {
  return (
    <Wrapper>
      <div className="search-box">
        <SearchBox />
      </div>
      <div className="feed">
        <div className="header">
          <h1>Explore the latest tweets</h1>
        </div>
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
