import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';

import PopUpTweetForm from '../components/PopUpTweetForm';
import { useGlobal } from '../Router';

import Navbar from '../components/Navbar';
import Discover from '../components/Discover';
import TweetShowcase from '../components/TweetShowcase';

const TweetDetail = () => {
  const { replyTo, modalIsOpen, setModalIsOpen } = useGlobal();
  return (
    <Wrapper>
      <Navbar />
      <TweetShowcase />
      <Discover search={false} />
      <PopUpTweetForm replyTo={replyTo} setIsOpen={setModalIsOpen} isOpen={modalIsOpen} update={false} />
      <Toaster toastOptions={toastOptions} />
    </Wrapper>
  );
};

export default TweetDetail;

const Wrapper = styled.main`
  background-color: var(--black);

  display: grid;
  grid-template-columns: 5fr 4fr 5fr;

  gap: 3rem;

  & .error-toast {
    background-color: var(--danger-dark);
    border-radius: 2rem;
    color: var(--light);
    font-size: 1.6rem;
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    gap: 0;
  }
`;

const toastOptions = {
  success: { style: { background: 'var(--twitter-blue)', color: 'var(--light)', fontSize: '1.5rem', fontWeight: 400 }, position: 'bottom-center' }
};
