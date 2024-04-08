import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';

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
          <Button>
            <Icon className="btn-icon" icon="ph:github-logo-fill" />
            Sign up with GitHub
          </Button>
          <Button>
            <Icon className="btn-icon" icon="ph:google-logo-fill" />
            Sign up with Google
          </Button>
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

    & .actions {
      display: flex;
      flex-direction: column;
      align-items: start;

      gap: 2rem;
    }
  }
`;

const Button = styled.a`
  display: flex;
  align-items: center;
  flex-grow: 0;

  gap: 1rem;

  padding: 1rem 5rem;
  background-color: ${(props) => (props.$primary ? 'var(--twitter-blue)' : 'var(--white)')};
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--black);
  border-radius: 3rem;

  & > .btn-icon {
    font-size: 3rem;
  }
`;
