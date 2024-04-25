import styled from 'styled-components';
import { Form, useField, Formik } from 'formik';
import * as Yup from 'yup';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useRef } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

import defaultPP from '../assets/profilePic.jpg';
import { ActualButton } from './Register';

const TweetForm = () => {
  const auth = useAuthUser();
  return (
    <Wrapper>
      <Formik
        initialValues={{
          tweet: '',
          file: ''
        }}
        validationSchema={Yup.object({
          tweet: Yup.string().required('Required').max(144, 'Must be less than 144 chars')
        })}
        onSubmit={() => console.log('xd')}
      >
        <Form className="register-form">
          <div className="tweet-field">
            <div className="profile-pic">
              <img src={auth.profilePic || defaultPP} alt="Profile Picture" />
            </div>
            <Input label="Tweet" name="tweet" type="text" placeholder="What is happening?!" />
          </div>
          <div className="buttons">
            <div>
              <Icon className="image-icon" icon="ph:image-square" />
            </div>
            <SubmitButton $primary type="submit">
              Post
            </SubmitButton>
          </div>
        </Form>
      </Formik>
    </Wrapper>
  );
};

export default TweetForm;

const Wrapper = styled.div`
  border-bottom: 1px solid var(--gray-dark);

  & > .register-form {
    display: flex;
    flex-direction: column;

    & > .tweet-field {
      display: flex;
      align-items: center;
      padding: 1rem;
      gap: 2rem;
      & > .profile-pic {
        display: flex;
        align-items: center;
        max-width: 3rem;
        overflow: hidden;

        & img {
          border-radius: 50%;
          max-width: inherit;
          object-fit: contain;
        }
      }
    }

    & > .buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;

      & > div {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        transition: all 0.3s;
        text-align: center;

        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: rgba(29, 155, 240, 0.5);
        }
      }

      & .image-icon {
        font-size: 2rem;
        color: var(--twitter-blue);
      }
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;

  letter-spacing: 1px;
  border-radius: 0.25rem;
  position: relative;

  & label {
  }

  & textarea {
    background-color: transparent;
    padding: 1rem 0.5rem;
    resize: none;
    font-family: 'Chirp';

    color: var(--light);
    font-weight: 400;
    font-size: 1.7rem;

    position: relative;
    outline: none;
    border: none;

    overflow: auto;
  }
`;

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    textareaRef.current.addEventListener('input', (event) => {
      event.target.style.height = 'auto';
      event.target.style.height = `${event.target.scrollHeight}px`;
    });
    field.onChange(e);
  };

  return (
    <>
      <FormGroup>
        <textarea ref={textareaRef} {...field} {...props} onChange={handleChange} />
        {/* {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null} */}
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

const SubmitButton = styled(ActualButton)`
  padding: 1rem 2rem;
  /* max-width: 20rem; */
`;
