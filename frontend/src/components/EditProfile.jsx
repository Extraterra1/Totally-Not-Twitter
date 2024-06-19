import Modal from './Modal';
import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import useAxios from 'axios-hooks';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

import { FileInput, SubmitButton } from './TweetForm';
import { Button } from './Actions';
import defaultPP from '../assets/profilePic.jpg';

const EditProfile = ({ setIsOpen, isOpen, refetchTweets }) => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const signIn = useSignIn();
  const [isFinished, setIsFinished] = useState(false);
  const [cookies, setCookie] = useCookies(['_auth_state']);

  const [authData, setAuthData] = useState(auth);

  useEffect(() => {
    if (cookies._auth_state?.username !== auth?.username) setAuthData(auth);
  });

  // Update data whenever cookie changes
  useEffect(() => {
    if (cookies._auth_state) setAuthData(cookies._auth_state);
  }, [cookies._auth_state]);

  const closeModal = () => setIsOpen(false);

  const delayedFinish = (resetForm) => {
    setIsFinished(true);

    setTimeout(() => {
      setIsFinished(false);
      resetForm();
    }, 1000);
  };

  const [{ loading }, updateUser] = useAxios(
    {
      url: `${import.meta.env.VITE_API_URL}/users/${authData._id}`,
      method: 'PATCH',
      headers: { Authorization: authHeader }
    },
    { manual: true }
  );

  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      const formData = new FormData();
      if (values.file) formData.append('img', values.file[0]);
      formData.append('displayName', values.displayName);
      if (values.password) {
        formData.append('password', values.password);
        formData.append('newPassword', values.newPassword);
        formData.append('confirmPassword', values.confirmPassword);
      }
      const res = await updateUser({
        data: formData,
        headers: { 'Content-Type': `multipart/form-data; boundary=${formData._boundary}`, Authorization: authHeader, Accept: 'application/json' }
      });

      const { email, displayName, followers, following, username, profilePic, _id } = res.data.updatedUser;

      // Refetch tweets if name or picture changed
      if (displayName !== authData.displayName || profilePic !== authData.profilePic) refetchTweets();
      // Update auth state
      signIn({
        auth: {
          token: res.data.token,
          type: 'Bearer'
        },
        userState: res.data.updatedUser
      });

      setSubmitting(false);

      delayedFinish(resetForm);
      toast.success('Saved', { duration: 1000 });
      setTimeout(() => {
        closeModal();
      }, 500);
    } catch (err) {
      if (err?.response?.status === 401) setErrors({ password: 'Incorrect Password' });
      console.log(err);
    }
  };

  return (
    <Modal setIsOpen={setIsOpen} style={modalStyles} isOpen={isOpen}>
      <Wrapper>
        <Icon onClick={closeModal} className="close-icon" icon="ph:x-bold" />
        <Formik
          initialValues={{
            displayName: authData.displayName,
            password: '',
            newPassword: '',
            confirmPassword: ''
          }}
          validationSchema={Yup.object({
            displayName: Yup.string().required('Required').max(30, 'Must be less than 30 chars'),
            password: Yup.string()
              .min(6, 'Must be at least 6 characters long')
              .test('passwordTest', 'Password is required', function (value) {
                const { newPassword, confirmPassword } = this.parent;
                if (value || newPassword || confirmPassword) {
                  return !!value;
                }
                return true;
              }),
            newPassword: Yup.string()
              .min(6, 'Must be at least 6 characters long')
              .test('newPasswordTest', 'New Password is required', function (value) {
                const { password, confirmPassword } = this.parent;
                if (value || password || confirmPassword) {
                  return !!value;
                }
                return true;
              })
              .oneOf([Yup.ref('confirmPassword'), null], 'Passwords must match'),
            confirmPassword: Yup.string()
              .min(6, 'Must be at least 6 characters long')
              .test('confirmPasswordTest', 'Confirm Password is required', function (value) {
                const { password, newPassword } = this.parent;
                if (value || password || newPassword) {
                  return !!value;
                }
                return true;
              })
              .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
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
          onSubmit={handleSubmit}
        >
          <Form className="user-form">
            <div className="user-field">
              <div className="profile-pic">
                <img src={authData?.profilePic || defaultPP} alt="Profile Picture" />
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
              <h4>Change Password (Optional)</h4>
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
      & > .profile-pic {
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 4px solid var(--gray-light);
        & > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
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
