import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';

import TweetForm from './TweetForm';

const Feed = () => {
  return (
    <>
      <Toaster position="top center" />
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
