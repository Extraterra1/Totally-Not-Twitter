import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';

import PopUpTweetForm from '../components/PopUpTweetForm';
import { useGlobal } from '../Router';

import Navbar from '../components/Navbar';
import SearchFeed from '../components/SearchFeed';
import Discover from '../components/Discover';

const Search = () => {
  const { replyTo, modalIsOpen, setModalIsOpen } = useGlobal();
  return (
    <Wrapper>
      <Navbar />
      <SearchFeed />
      <Discover />
      <PopUpTweetForm replyTo={replyTo} setIsOpen={setModalIsOpen} isOpen={modalIsOpen} update={false} />
      <Toaster toastOptions={toastOptions} />
    </Wrapper>
  );
};

export default Search;

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
`;

const toastOptions = {
  success: { style: { background: 'var(--twitter-blue)', color: 'var(--light)', fontSize: '1.5rem', fontWeight: 400 }, position: 'bottom-center' }
};
