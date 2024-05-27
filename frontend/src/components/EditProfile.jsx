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
            displayName: '',
            password: '',
            newPassword: '',
            confirmPassword: ''
          }}
          validationSchema={Yup.object({
            displayName: Yup.string().max(25, 'Must be less than 25 chars'),
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
              <FileInput name="file" id="file" />
            </div>
            <Input type="password" name="password" id="password" label="Password" placeholder="Enter your current password" />
            <Input type="newPassword" name="newPassword" id="newPassword" label="New Password" placeholder="Enter your new password" />
            <Input type="confirmPassword" name="confirmPassword" id="confirmPassword" label="Confirm Password" placeholder="Confirm Password" />
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
  padding: 2rem 1rem;

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
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;

  letter-spacing: 1px;
  border-radius: 0.25rem;
  position: relative;
  border-bottom: 1px solid transparent;

  & label {
    cursor: pointer;
  }
`;

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <FormGroup>
        <label>{label}</label>
        <input {...field} {...props} />
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
