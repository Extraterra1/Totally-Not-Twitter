import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import { useState } from 'react';
import useAxios from 'axios-hooks';
import { useLocation } from 'react-router-dom';

import Tweet from './Tweet';
import SearchBox from './SearchBox';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchFeed = () => {
  const query = useQuery();
  const searchTerm = query.get('q');
  const [activeMenu, setActiveMenu] = useState('tweets');

  const [{ data: tweetsData, loading: tweetsLoading }] = useAxios(
    { url: `${import.meta.env.VITE_API_URL}/tweets/search?q=${searchTerm}`, method: 'GET' },
    { useCache: false }
  );

  console.log(tweetsData);
  const handleMenuClick = async () => {
    if (activeMenu === 'tweets') {
      setActiveMenu('likes');
    } else {
      setActiveMenu('tweets');
    }
  };

  return (
    <Wrapper>
      <div className="search-box">
        <SearchBox />
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
        {/* <BeatLoader className="spinner" loading={activeMenu === 'tweets' && tweetsLoading} color="var(--twitter-blue)" size={45} />
        {!tweetsLoading && tweetsData && activeMenu === 'tweets' && tweetsData.tweets.map((e) => <Tweet key={e._id} tweet={e} update={false} />)}
        {!likesLoading && likesData && activeMenu === 'likes' && likesData.tweets.map((e) => <Tweet key={e._id} tweet={e} update={false} />)}
        {!tweetsLoading && activeMenu === 'tweets' && tweetsData?.tweets?.length === 0 && <h2 className="no-tweets">Nothing to see here...</h2>}
        {!likesLoading && activeMenu === 'likes' && likesData?.tweets?.length === 0 && <h2 className="no-tweets">Nothing to see here...</h2>} */}
      </div>
      ;
    </Wrapper>
  );
};

export default SearchFeed;

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

          &:hover {
            color: var(--light);
            background-color: var(--gray-dark);
          }
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
