import styled from 'styled-components';

import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import Discover from '../components/Discover';

const Timeline = () => {
  return (
    <>
      <Wrapper>
        <Navbar />
        <Feed />
        <Discover />
      </Wrapper>
    </>
  );
};

export default Timeline;

const Wrapper = styled.main`
  background-color: var(--black);

  display: grid;
  grid-template-columns: 5fr 4fr 5fr;

  gap: 3rem;
`;
