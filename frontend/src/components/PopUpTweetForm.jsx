import Modal from './Modal';
import styled from 'styled-components';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAxios from 'axios-hooks';
import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';

import defaultPP from '../assets/profilePic.jpg';
import { useTimeline } from '../context/TimelineContext';
import { ActualButton } from './Register';
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
      if (!values.popUpTweet) return setErrors({ popUpTweet: 'Tweet cannot be empty' });
      const tweetType = replyTo ? 'reply' : 'tweet';

      const formData = new FormData();

      formData.append('content', values.popUpTweet);
      formData.append('tweetType', tweetType);

      if (tweetType === 'reply') formData.append('replyTo', replyTo._id);
      if (values.popUpFile) formData.append('img', values.popUpFile[0]);

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
            popUpTweet: ''
          }}
          validationSchema={Yup.object({
            popUpTweet: Yup.string().max(144, 'Must be less than 144 chars'),
            popUpFile: Yup.mixed()
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
              <Input label="Tweet" name="popUpTweet" type="text" placeholder="What is happening?!" />
            </div>
            <div className="buttons">
              <div>
                <FileInput name="popUpFile" id="popUpFile" />
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
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        & img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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

const FileInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  useEffect(() => {
    if (meta.error) toast.error(meta.error, { className: 'error-toast', id: 'error' });
  }, [meta]);

  return (
    <>
      <FormGroup style={props.hidden ? { display: 'none' } : null}>
        <label htmlFor={props.id || props.name}>
          <Icon className="image-icon" icon="ph:image-square" />
        </label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          {...field}
          {...props}
          value={undefined}
          onChange={(event) => {
            if (event.currentTarget.files) {
              helpers.setValue(event.currentTarget.files);
            }
          }}
        />
      </FormGroup>
    </>
  );
};

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;

  letter-spacing: 1px;
  border-radius: 0.25rem;
  position: relative;
  border-bottom: 1px solid transparent;

  &:has(textarea:focus) {
    border-bottom: 1px solid var(--gray-dark);
  }

  & label {
    cursor: pointer;
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

  & input[type='file'] {
    display: none;
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

  useEffect(() => {
    if (meta.touched && meta.error) toast.error(meta.error, { className: 'error-toast', id: 'error' });
  }, [meta]);

  return (
    <>
      <FormGroup>
        <textarea ref={textareaRef} {...field} {...props} onChange={handleChange} />
      </FormGroup>
    </>
  );
};

const SubmitButton = styled(ActualButton)`
  padding: 1rem 2rem;
  width: 20%;

  & .done-icon {
    font-size: 2rem;
  }
  /* max-width: 20rem; */
`;
