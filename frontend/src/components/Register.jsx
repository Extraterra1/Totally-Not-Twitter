import { Icon } from '@iconify/react/dist/iconify.js';
import styled from 'styled-components';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

import { useModal } from './Modal';
import { Button } from './Actions';

import TNTLogo from '../assets/ttn-logo.png';

const Register = () => {
  const { closeModal } = useModal();
  return (
    <Wrapper>
      <Header>
        <Icon onClick={closeModal} className="close-icon" icon="ph:x-bold" />
        <div className="img">
          <img src={TNTLogo} alt="TNT Logo" />
        </div>
      </Header>
      <Content>
        <div className="title">
          <h1>Create your account</h1>
        </div>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            month: '',
            day: '',
            year: ''
          }}
          validationSchema={Yup.object({
            username: Yup.string()
              .required('Required')
              .min(3, 'Username must be at least 3 characters long')
              .max(20, 'Username must be less than 20 characters long'),
            email: Yup.string().required('Required').email('Must be a valid email address'),
            password: Yup.string().required('Required').min(6, 'Must be at least 6 characters long'),
            confirmPassword: Yup.string()
              .required('Required')
              .min(6, 'Must be at least 6 characters long')
              .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            month: Yup.string()
              .required('Required')
              .oneOf(
                ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                'Invalid Month'
              ),
            day: Yup.number().required('Required').min(0, 'Invalid day').max(31, 'Invalid day'),
            year: Yup.number().required('Required').min(1900, 'Invalid year').max(new Date().getFullYear(), 'Invalid year')
          })}
          onSubmit={() => console.log('xd')}
        >
          <Form className="register-form">
            <Input label="Username" name="username" type="text" placeholder="JohnDoe" />
            <Input label="Email" name="email" type="email" placeholder="johndoe@gmail.com" />
            <Input label="Password" name="password" type="password" />
            <Input label="Confirm Password" name="confirmPassword" type="password" />
          </Form>
        </Formik>
      </Content>
    </Wrapper>
  );
};

export default Register;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  font-family: 'Montserrat';
  letter-spacing: 1px;

  & label {
    font-size: 1.7rem;
  }

  & input {
    background-color: #fff;
    padding: 1rem 2rem;
    border: 1px solid var(--dark);
    border-radius: 0.25rem;
    color: var(--dark);
    font-family: 'Montserrat';
    font-weight: 400;
    font-size: 1.5rem;
    min-width: 30rem;
  }
`;

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <FormGroup>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input {...field} {...props} />
        {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
      </FormGroup>
    </>
  );
};

const ErrorMessage = styled.div`
  color: var(--danger);
  font-size: 1.2rem;
  font-weight: 500;
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
  padding: 0 5rem;

  & > .title {
    font-size: 1.4rem;
  }
`;
