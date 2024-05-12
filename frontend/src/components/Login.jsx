import { Icon } from '@iconify/react/dist/iconify.js';
import styled from 'styled-components';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import useAxios from 'axios-hooks';
import { ClipLoader } from 'react-spinners';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { Navigate } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import toast from 'react-hot-toast';

import { useModal } from './Modal';
import { ActualButton } from './Register';
import { Line } from './Actions';

import TNTLogo from '../assets/ttn-logo.png';

const Login = () => {
  const { closeModal } = useModal();
  const [{ loading }, executeLogin] = useAxios({ url: `${import.meta.env.VITE_API_URL}/login`, method: 'POST' }, { manual: true });
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await executeLogin({ data: { username: values.username, password: values.password } });
      signIn({
        auth: {
          token: res.data.token,
          type: 'Bearer'
        },
        userState: res.data.user
      });
      toast.success('Welcome Back!');
      setSubmitting(false);
    } catch (err) {
      if (err?.response) {
        const errors = { username: 'Wrong Username/Password', password: 'Wrong Username/Password' };
        setErrors(errors);
      }
      console.log(err);
    }
  };

  return (
    <>
      {isAuthenticated && <Navigate to="/timeline" />}
      <Wrapper>
        <Header>
          <Icon onClick={closeModal} className="close-icon" icon="ph:x-bold" />
          <div className="img">
            <img src={TNTLogo} alt="TNT Logo" />
          </div>
        </Header>
        <Content>
          <div className="title">
            <h1>Sign in to TTN</h1>
          </div>
          <div className="separator">
            <Line />
            <span>or</span>
            <Line />
          </div>
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={Yup.object({
              username: Yup.string().required('Required'),
              password: Yup.string().required('Required')
            })}
            onSubmit={handleSubmit}
          >
            <Form className="register-form">
              <Input label="Username or Email" name="username" type="text" />
              <Input label="Password" name="password" type="password" />
              <SubmitButton type="submit">{loading ? <ClipLoader /> : 'Login'}</SubmitButton>
            </Form>
          </Formik>
          <span className="register-link">
            Don't have an account? <a onClick={closeModal}>Sign up</a>
          </span>
        </Content>
      </Wrapper>
    </>
  );
};

export default Login;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 3rem;
  letter-spacing: 1px;
  border-radius: 0.25rem;
  position: relative;
  min-height: 5rem;

  &:has(input.has-text) {
    display: grid;
    grid-template-rows: auto 1fr;

    & label {
      position: relative;
      transform: none;
      font-size: 1rem;

      top: 0;
      left: 0;

      margin-left: 0.5rem;
    }
  }

  &:has(input:focus) {
    outline: 3px solid var(--twitter-blue);
    display: grid;
    grid-template-rows: auto 1fr;

    &:has(span) {
      outline-color: var(--danger);

      & label {
        color: var(--danger);
      }
    }

    & label {
      position: relative;
      transform: none;
      font-size: 1rem;

      top: 0;
      left: 0;

      margin-left: 0.5rem;
    }

    & input {
      border: none;
      font-size: 1.5rem;
      padding: 0 0.5rem;
    }
  }

  &:has(span) {
    color: var(--danger);
    outline: 3px solid var(--danger);

    & input {
      border: none;
    }
  }

  & label {
    font-size: 1.5rem;
    position: absolute;
    top: 50%;
    left: 1rem;
    bottom: auto;
    transform: translate(0, -50%);

    color: var(--gray);
  }

  & input {
    background-color: transparent;
    padding: 1rem 0.5rem;
    border: 1px solid var(--dark);
    border-radius: 0.25rem;
    color: var(--light);
    font-weight: 400;
    font-size: 2rem;
    min-width: 35rem;
    position: relative;
    outline: none;
    flex-grow: 1;

    &.has-text {
      background-color: var(--black);
      font-size: 1.5rem;
      flex-grow: 1;
    }
  }
`;

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <FormGroup>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className={field.value ? 'has-text' : null} {...field} {...props} />
        {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
      </FormGroup>
    </>
  );
};

const ErrorMessage = styled.span`
  color: var(--danger);
  font-size: 1.2rem;
  font-weight: 500;
  position: absolute;
  top: calc(100% + 3px);
  letter-spacing: 0.5px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--black);
  padding: 1rem;
  border-radius: 1rem;
  gap: 2rem;

  color: var(--light);
`;

const Header = styled.div`
  display: flex;
  color: var(--light);

  & > .img {
    flex-grow: 1;
    margin: 0 auto;
    max-width: 5rem;

    & > img {
      max-width: inherit;
      object-fit: cover;
    }
  }

  & > .close-icon {
    font-size: 2rem;
    cursor: pointer;

    &:hover {
      color: var(--gray-light);
      transition: all 0.1s;
    }
  }
`;

const Content = styled.div`
  padding: 0 8rem;

  & > .title {
    font-size: 1.4rem;
    margin-bottom: 2rem;
  }

  & > .register-form {
    display: flex;
    flex-direction: column;
  }

  & > .register-link {
    color: var(--gray);
    font-size: 1.3rem;

    & > a {
      color: var(--twitter-blue);
      font-weight: 700;
      cursor: pointer;
    }
  }

  & > .separator {
    margin-bottom: 3rem;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 2rem;

    align-self: stretch;
    font-size: 1.5rem;

    & > div {
      background-color: var(--gray-dark);
    }
  }
`;
const SubmitButton = styled(ActualButton)`
  margin: 4rem 0;
  padding: 1.5rem 5rem;
`;
