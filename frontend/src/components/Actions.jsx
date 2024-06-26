import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import useAxios from 'axios-hooks';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const redirectToGithub = () => window.location.assign(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}`);

const Actions = ({ openRegisterModal, openLoginModal }) => {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const [{ loading }, executeLogin] = useAxios(
    { data: { username: 'DemoMan', password: 'thisisademo' }, url: `${import.meta.env.VITE_API_URL}/login`, method: 'POST' },
    { manual: true }
  );

  const demoLogin = async () => {
    const res = await toast.promise(executeLogin(), { loading: 'Logging in...', success: 'Welcome Back!', error: 'Wrong Username/Password' });
    signIn({
      auth: {
        token: res.data.token,
        type: 'Bearer'
      },
      userState: res.data.user
    });

    setTimeout(() => {
      navigate('/timeline');
    }, 1000);
  };

  return (
    <Container>
      <div className="cta">
        <h1>Happening Now</h1>
        <h2>Join today.</h2>
      </div>
      <div className="actions">
        <div className="buttons">
          <Button onClick={redirectToGithub}>
            <Icon className="btn-icon" icon="ph:github-logo-fill" />
            Sign up with GitHub
          </Button>
          <div className="separator">
            <Line />
            <span>or</span>
            <Line />
          </div>
          <Button onClick={openRegisterModal} $primary>
            Create Account
          </Button>
          <div className="sign-in">
            <span>Already have an account?</span>
            <Button onClick={openLoginModal} $negative>
              Sign in
            </Button>
            <Button onClick={demoLogin} $negative>
              Try the demo account
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Actions;

const Container = styled.div`
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

  @media screen and (max-width: 1100px) {
    & .cta {
      & > h1 {
        font-size: 5rem;
      }
    }
  }
  @media screen and (max-width: 900px) {
    & .cta {
      & > h1 {
        font-size: 4rem;
      }
    }
  }

  @media screen and (max-width: 800px) {
    align-self: start;
    padding: 2rem;

    display: grid;
    align-items: center;
    grid-template-rows: auto 1fr;

    & .cta {
      line-height: 8rem;
      padding-top: 3rem;
      & > h1 {
        font-size: 5rem;
      }
    }

    & .actions {
      align-self: flex-start;
      margin-top: 10rem;
      & .buttons {
        align-self: stretch;
      }

      & .sign-in {
        & span {
          font-size: 1.5rem;
        }
      }
    }
  }
`;
export const Button = styled.a`
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

export const Line = styled.div`
  height: 1px;
  background-color: var(--gray);
`;
