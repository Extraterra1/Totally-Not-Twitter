import styled from 'styled-components';
import { Tooltip } from 'react-tooltip';
import { ClipLoader } from 'react-spinners';

import TweetForm from './TweetForm';
import Tweet from './Tweet';
import { useTimeline } from '../views/Timeline';

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
          <ClipLoader loading={loading} size={35} color="var(--twitter-blue)" cssOverride={{ margin: '2rem auto' }} />
          <Tooltip delayShow={500} id="user-popup" clickable />
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
`;
