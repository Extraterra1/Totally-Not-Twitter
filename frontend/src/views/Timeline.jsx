import styled from 'styled-components';

import Navbar from '../components/Navbar';

const Timeline = () => {
  return (
    <>
      <Wrapper>
        <Navbar />
      </Wrapper>
    </>
  );
};

export default Timeline;

const Wrapper = styled.main`
  background-color: var(--black);

  display: grid;
  grid-template-columns: 5fr 3fr 5fr;
`;
