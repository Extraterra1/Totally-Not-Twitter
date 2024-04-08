import styled from 'styled-components';

const Landing = () => {
  return (
    <Wrapper>
      <h1>hey</h1>
    </Wrapper>
  );
};

export default Landing;

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;

  background-color: var(--black);
  color: var(--light);
`;
