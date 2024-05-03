import styled from 'styled-components';
import { Form, useField, Formik } from 'formik';
import * as Yup from 'yup';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useRef, useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import toast from 'react-hot-toast';
import useAxios from 'axios-hooks';
import { BeatLoader } from 'react-spinners';

import defaultPP from '../assets/profilePic.jpg';
import { ActualButton } from './Register';
import { useTimeline } from '../views/Timeline';

const TweetForm = () => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const [isFinished, setIsFinished] = useState(false);
  const { setTweets } = useTimeline();

  const delayedFinish = () => {
    setIsFinished(true);

    setTimeout(() => {
      setIsFinished(false);
    }, 1000);
  };

  const [{ loading }, sendTweet] = useAxios(
    {
      url: `${import.meta.env.VITE_API_URL}/tweets`,
      method: 'POST'
    },
    { manual: true }
  );

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      if (values.file) formData.append('img', values.file[0]);
      formData.append('content', values.tweet);
      formData.append('tweetType', 'tweet');

      const res = await sendTweet({
        data: formData,
        headers: { 'Content-Type': `multipart/form-data; boundary=${formData._boundary}`, Authorization: authHeader, Accept: 'application/json' }
      });
      setSubmitting(false);
      resetForm();
      delayedFinish();
      setTweets((tweets) => [res.data.tweet, ...tweets]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
        onSubmit={handleSubmit}
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
  );
};

export default TweetForm;

const Wrapper = styled.div`
  border-bottom: 1px solid var(--gray-dark);

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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;

  letter-spacing: 1px;
  border-radius: 0.25rem;
  position: relative;

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

export const FileInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  useEffect(() => {
    if (meta.error) toast.error(meta.error, { className: 'error-toast', id: 'error' });
  }, [meta]);

  return (
    <>
      <FormGroup>
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

export const Input = ({ label, ...props }) => {
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

const ErrorMessage = styled.span`
  color: var(--danger);
  font-size: 1.2rem;
  font-weight: 500;
  position: absolute;
  top: calc(100% + 3px);
  letter-spacing: 0.5px;
`;

export const SubmitButton = styled(ActualButton)`
  padding: 1rem 2rem;
  width: 20%;

  & .done-icon {
    font-size: 2rem;
  }
  /* max-width: 20rem; */
`;
