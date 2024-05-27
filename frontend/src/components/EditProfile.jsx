import Modal from './Modal';
import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import useAxios from 'axios-hooks';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useState } from 'react';

import { FileInput, SubmitButton } from './TweetForm';
import { Button } from './Actions';
import defaultPP from '../assets/profilePic.jpg';

const EditProfile = ({ setIsOpen, isOpen }) => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const [isFinished, setIsFinished] = useState(false);

  const closeModal = () => setIsOpen(false);

  const [{ loading }, updateUser] = useAxios(
    {
      url: `${import.meta.env.VITE_API_URL}/users/${auth._id}`,
      method: 'PATCH',
      headers: { Authorization: authHeader }
    },
    { manual: true }
  );

  return (
    <Modal setIsOpen={setIsOpen} style={modalStyles} isOpen={isOpen}>
      <Wrapper>
        <Icon onClick={closeModal} className="close-icon" icon="ph:x-bold" />
        <Formik
          initialValues={{
            displayName: auth.displayName,
            password: '',
            newPassword: '',
            confirmPassword: ''
          }}
          validationSchema={Yup.object({
            displayName: Yup.string().required('Required').max(25, 'Must be less than 25 chars'),
            newPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
            file: Yup.mixed()
              .test('fileType', 'Bad Image Format', (value) => {
                if (value && value[0]) {
                  return value[0].type === 'image/jpeg' || value[0].type === 'image/jpg' || value[0].type === 'image/png';
                } else {
                  return true;
                }
              })
              .test('fileSize', 'Image Too Big', (value) => {
                if (value && value[0]) {
                  // 800 kb
                  return value[0].size < 800 * 1000;
                } else {
                  return true;
                }
              })
          })}
          onSubmit={() => console.log('submit')}
        >
          <Form className="user-form">
            <div className="user-field">
              <div className="profile-pic">
                <img src={auth?.profilePic || defaultPP} alt="Profile Picture" />
              </div>
              <label htmlFor="file">
                <Button>Change Picture</Button>
              </label>
              <FileInput name="file" id="file" hidden />
            </div>
            <div className="name-change">
              <h4>Change Name</h4>
              <Input type="displayName" name="displayName" id="displayName" label="Name" />
            </div>
            <div className="password-change">
              <h4>Change Password</h4>
              <Input type="password" name="password" id="password" label="Password" placeholder="Enter your current password" />
              <Input type="password" name="newPassword" id="newPassword" label="New Password" placeholder="Enter your new password" />
              <Input type="password" name="confirmPassword" id="confirmPassword" label="Confirm Password" placeholder="Confirm Password" />
            </div>
            <div className="buttons">
              <SubmitButton $primary type="submit">
                {loading ? (
                  <BeatLoader loading={loading} size={5} color="var(--light)" />
                ) : isFinished ? (
                  <Icon className="done-icon" icon="ph:check-bold" />
                ) : (
                  'Save'
                )}
              </SubmitButton>
            </div>
          </Form>
        </Formik>
      </Wrapper>
    </Modal>
  );
};

export default EditProfile;

const Wrapper = styled.div`
  background-color: var(--black);
  min-width: 30vw;
  border-radius: 1.5rem;
  padding: 2rem 3rem;

  position: relative;

  & > .close-icon {
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--gray-light);
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;

    &:hover {
      color: var(--gray);
      transition: all 0.1s;
    }
  }

  & > .user-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    & > .user-field {
      display: flex;
      justify-content: space-between;
      align-items: end;
      & > .profile-pic img {
        width: 10rem;
        border-radius: 50%;

        border: 4px solid var(--gray-light);

        object-fit: cover;
      }
    }

    & > .password-change,
    & > .name-change {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      & > h4 {
        font-size: 2rem;
        color: var(--white);
      }
    }

    & > .buttons {
      display: flex;
      justify-content: center;
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;

  border-radius: 0.25rem;
  position: relative;
  border-bottom: 1px solid transparent;

  & label {
    cursor: pointer;
    color: var(--light);
    font-size: 1.5rem;
  }

  & input {
    background-color: var(--black);
    outline: none;
    border: 1px solid var(--gray-dark);
    padding: 1rem;
    border-radius: 0.5rem;
  }
`;

const ErrorMessage = styled.span`
  color: var(--danger);
  font-size: 1rem;
  font-weight: 500;
  position: absolute;
  top: calc(100% + 3px);
  letter-spacing: 0.5px;
`;

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <FormGroup>
        <label>{label}</label>
        <input {...field} {...props} />
        {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
      </FormGroup>
    </>
  );
};

const modalStyles = {
  content: {
    top: '2rem',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate( -50%)',
    border: 0,
    backgroundColor: 'transparent',
    padding: '0'
  },
  overlay: {
    backgroundColor: 'var(--modal-overlay-bg)'
  }
};
