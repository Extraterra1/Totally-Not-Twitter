import Modal from './Modal';
import styled from 'styled-components';
import { Form, useField, Formik } from 'formik';
import * as Yup from 'yup';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAxios from 'axios-hooks';
import { useState } from 'react';

import defaultPP from '../assets/profilePic.jpg';
import { Input, FileInput, SubmitButton } from './TweetForm';

const PopUpTweetForm = ({ setIsOpen, isOpen }) => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  const [isFinished, setIsFinished] = useState(false);

  const delayedFinish = () => {
    setIsFinished(true);

    setTimeout(() => {
      setIsFinished(false);
    }, 1000);
  };

  const [{ loading }, sendTweet] = useAxios(
    {
      url: `${import.meta.env.VITE_API_URL}/tweets`,
      method: 'POST',
      headers: { Authorization: authHeader }
    },
    { manual: true }
  );

  return (
    <Modal setIsOpen={setIsOpen} isOpen={isOpen} style={modalStyles}>
      <Wrapper>
        <Formik
          initialValues={{
            tweet: ''
          }}
          validationSchema={Yup.object({
            tweet: Yup.string().required('Tweet cannot be empty').max(144, 'Must be less than 144 chars'),
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
          onSubmit={() => console.log('xd')}
        >
          <Form className="tweet-form">
            <div className="tweet-field">
              <div className="profile-pic">
                <img src={auth.profilePic || defaultPP} alt="Profile Picture" />
              </div>
              <Input label="Tweet" name="tweet" type="text" placeholder="What is happening?!" />
            </div>
            <div className="buttons">
              <div>
                <FileInput name="file" id="file" />
              </div>
              <SubmitButton $primary type="submit">
                {loading ? (
                  <BeatLoader loading={loading} size={5} color="var(--light)" />
                ) : isFinished ? (
                  <Icon className="done-icon" icon="ph:check-bold" />
                ) : (
                  'Post'
                )}
              </SubmitButton>
            </div>
          </Form>
        </Formik>
      </Wrapper>
    </Modal>
  );
};

export default PopUpTweetForm;

const Wrapper = styled.div`
  background-color: var(--black);
  min-width: 30vw;
  border-radius: 1.5rem;

  position: relative;

  & div:has(textarea:focus) {
    border-bottom: none;
  }

  & > .tweet-form {
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

const modalStyles = {
  content: {
    top: '15%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 0,
    backgroundColor: 'transparent',
    padding: '0'
  },
  overlay: {
    backgroundColor: 'var(--modal-overlay-bg)'
  }
};
