import styled from 'styled-components';
import { Tooltip } from 'react-tooltip';
import { ClipLoader } from 'react-spinners';

import TweetForm from './TweetForm';
import Tweet from './Tweet';
// import { useTimeline } from '../views/Timeline';
import { useTimeline } from '../context/TimelineContext';

const Feed = () => {
  const { tweets, loading } = useTimeline();

  return (
    <>
      <Wrapper>
        <TweetForm />
        <TweetsContainer>
          {tweets.map((e) => (
            <Tweet key={e._id} tweet={e} />
          ))}
          {!loading && tweets.length === 0 ? (
            <div className="error-message">
              <h2>Nothing to see here...</h2>
              <span>Maybe try following some of our recommended users</span>
            </div>
          ) : null}
          <ClipLoader loading={loading} size={35} color="var(--twitter-blue)" cssOverride={{ margin: '2rem auto' }} />
        </TweetsContainer>
      </Wrapper>
    </>
  );
};

export default Feed;

const Wrapper = styled.div`
  border-left: 1px solid var(--gray-dark);
  border-right: 1px solid var(--gray-dark);
`;

const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > .error-message {
    color: var(--light);
    padding: 1rem;
    text-align: center;
    margin-top: 5rem;

    & > h2 {
      font-size: 3rem;
    }
    & > span {
      font-size: 1.5rem;
    }
  }
`;
