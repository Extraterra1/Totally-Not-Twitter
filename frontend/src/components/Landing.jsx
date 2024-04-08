import styled from 'styled-components';

const Landing = () => {
  return (
    <Wrapper>
      <div className="logo-container"></div>
      <div className="actions-container">
        <div className="cta">
          <h1>Happening Now</h1>
          <h2>Join today.</h2>
        </div>
        <div className="actions">
          <Button>Sign up with GitHub</Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;

  align-items: center;

  background-color: var(--black);
  color: var(--light);

  & > .actions-container {
    & .cta {
      font-family: 'ChirpExtended';
      font-weight: 900;
      line-height: 13rem;

      & > h1 {
        font-size: 6rem;
      }

      & > h2 {
        font-size: 3rem;
      }
    }
  }
`;

const Button = styled.button`
  padding: 1.5rem 5rem;
  background-color: var(--light);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--black);
  border-radius: 3rem;
`;
