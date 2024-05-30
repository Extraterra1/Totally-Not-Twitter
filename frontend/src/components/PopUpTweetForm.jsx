import Modal from './Modal';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAxios from 'axios-hooks';
import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';

import defaultPP from '../assets/profilePic.jpg';
import { Input, FileInput, SubmitButton } from './TweetForm';
import { useTimeline } from '../views/Timeline';
import Tweet from './Tweet';

const PopUpTweetForm = ({ setIsOpen, isOpen, replyTo, update = true }) => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  let setTweets = null;
  if (update) ({ setTweets } = useTimeline());

  const [isFinished, setIsFinished] = useState(false);

  const closeModal = () => setIsOpen(false);

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

  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      if (!values.tweet) return setErrors({ tweet: 'Tweet cannot be empty' });
      const tweetType = replyTo ? 'reply' : 'tweet';

      const formData = new FormData();

      formData.append('content', values.tweet);
      formData.append('tweetType', tweetType);

      if (tweetType === 'reply') formData.append('replyTo', replyTo._id);
      if (values.file) formData.append('img', values.file[0]);

      const res = await sendTweet({
        data: formData,
        headers: { 'Content-Type': `multipart/form-data; boundary=${formData._boundary}`, Authorization: authHeader, Accept: 'application/json' }
      });
      setSubmitting(false);
      resetForm();
      delayedFinish();
      if (update) setTweets((tweets) => [res.data.tweet, ...tweets]);
      closeModal();
      toast.success('Tweet sent');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal setIsOpen={setIsOpen} isOpen={isOpen} style={{ content: { ...modalStyles.content }, overlay: { ...modalStyles.overlay } }}>
      <Wrapper>
        {replyTo && <Tweet $reply $noActions tweet={replyTo} update={false} />}
        <Icon onClick={closeModal} className="close-icon" icon="ph:x-bold" />
        <Formik
          initialValues={{
            tweet: ''
          }}
          validationSchema={Yup.object({
            tweet: Yup.string().max(144, 'Must be less than 144 chars'),
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
          <Form className="tweet-form">
            <div className="tweet-field">
              <div className="profile-pic">
                <img src={auth?.profilePic || defaultPP} alt="Profile Picture" />
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

  & div:has(textarea:focus) {
    border-bottom: none;
  }

  & > .tweet-form {
    display: flex;
    flex-direction: column;

    & > .tweet-field {
      display: flex;
      align-items: start;
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
