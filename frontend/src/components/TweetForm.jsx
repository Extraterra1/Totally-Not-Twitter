import styled from 'styled-components';
import { Form, useField, Formik } from 'formik';
import * as Yup from 'yup';

import { ActualButton } from './Register';

const TweetForm = () => {
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
          <Input label="Tweet" name="tweet" type="text" placeholder="What is happening?!" />
          <SubmitButton type="submit">Post</SubmitButton>
        </Form>
      </Formik>
    </Wrapper>
  );
};

export default TweetForm;

const Wrapper = styled.div`
  border-bottom: 1px solid var(--gray-dark);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 3rem;
  letter-spacing: 1px;
  border-radius: 0.25rem;
  position: relative;

  & label {
  }

  & input {
    background-color: transparent;
    padding: 1rem 0.5rem;

    color: var(--light);
    font-weight: 400;
    font-size: 2rem;

    position: relative;
    outline: none;
    border: none;
  }
`;

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <FormGroup>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className={field.value ? 'has-text' : null} {...field} {...props} />
        {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
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
  margin: 4rem 0;
  padding: 1.5rem 5rem;
`;
