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
          <div className="buttons">
            <Button>
              <Icon className="btn-icon" icon="ph:github-logo-fill" />
              Sign up with GitHub
            </Button>
            <Button>
              <Icon className="btn-icon" icon="ph:google-logo-fill" />
              Sign up with Google
            </Button>
            <div className="separator">
              <Line />
              <span>or</span>
              <Line />
            </div>
            <Button $primary>Create Account</Button>
            <div className="sign-in">
              <span>Already have an account?</span>
              <Button $negative>Sign in</Button>
            </div>
          </div>
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

      & .buttons {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      & .separator {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 2rem;

        align-self: stretch;
        font-size: 1.5rem;
      }

      & .sign-in {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        & span {
          font-size: 1.3rem;
          font-weight: 700;
        }
      }
    }
  }
`;

const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0;

  gap: 1rem;

  padding: 1rem 5rem;
  background-color: ${(props) => (props.$primary ? 'var(--twitter-blue)' : props.$negative ? 'var(--black)' : 'var(--white)')};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => (props.$primary ? 'var(--light)' : props.$negative ? 'var(--twitter-blue)' : 'var(--black)')};
  border-radius: 3rem;
  cursor: pointer;
  transition: all 0.3s;
  border: ${(props) => (props.$negative ? '1px solid var(--gray)' : null)};

  & > .btn-icon {
    font-size: 3rem;
  }

  &:hover {
    background-color: ${(props) => (props.$primary ? 'var(--twitter-blue-hover)' : props.$negative ? 'rgba(29,155,240,0.09)' : '#eaeaea')};
  }
`;

const Line = styled.div`
  height: 1px;
  background-color: var(--gray);
`;

// TODOS
// SMALL LETTERS
