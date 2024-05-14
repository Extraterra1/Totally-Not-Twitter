import styled from 'styled-components';

const Discover = () => {
  return (
    <>
      <Wrapper>
        <div className="search-box"></div>
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
