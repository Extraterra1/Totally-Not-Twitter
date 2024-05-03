import Modal from './Modal';
import styled from 'styled-components';
import { Form, useField, Formik } from 'formik';
import * as Yup from 'yup';

import defaultPP from '../assets/profilePic.jpg';

const PopUpTweetForm = ({ setIsOpen, isOpen }) => {
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

const FileInput = ({ label, ...props }) => {
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
