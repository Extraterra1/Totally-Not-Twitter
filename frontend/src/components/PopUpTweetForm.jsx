import Modal from './Modal';
import styled from 'styled-components';
import { Form, useField, Formik } from 'formik';
import * as Yup from 'yup';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import defaultPP from '../assets/profilePic.jpg';
import { Input, FileInput, SubmitButton } from './TweetForm';

const PopUpTweetForm = ({ setIsOpen, isOpen }) => {
  const auth = useAuthUser();
  return (
    <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
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
        <Form className="register-form">
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
    </Modal>
  );
};

export default PopUpTweetForm;
