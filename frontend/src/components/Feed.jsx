import styled from 'styled-components';

import TweetForm from './TweetForm';

const Feed = () => {
  return (
    <>
      <Wrapper>
        <TweetForm />
      </Wrapper>
    </>
  );
};

export default Feed;

const Wrapper = styled.div`
  border-left: 1px solid var(--gray-dark);
  border-right: 1px solid var(--gray-dark);
`;
