import styled from 'styled-components';

import SearchBox from './SearchBox';
import WhoToFollow from './WhoToFollow';
const Discover = ({ search = true }) => {
  return (
    <>
      <Wrapper>
        <Container $search={search}>
          {search ? <SearchBox /> : null}
          <WhoToFollow />
        </Container>
      </Wrapper>
    </>
  );
};

export default Discover;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  padding-top: ${(props) => (props.$search ? null : '3rem')};
`;
