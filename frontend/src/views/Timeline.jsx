import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import useAxios from 'axios-hooks';
import { useState, useEffect, createContext, useContext } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import Discover from '../components/Discover';
import PopUpTweetForm from '../components/PopUpTweetForm';
import { useGlobal } from '../Router';

const TimelineContext = createContext();

export const useTimeline = () => {
  return useContext(TimelineContext);
};

const Timeline = () => {
  const { replyTo, openTweetModal, modalIsOpen, setModalIsOpen } = useGlobal();
  const authHeader = useAuthHeader();
  const auth = useAuthUser();

  const [offset, setOffset] = useState(0);
  const [tweets, setTweets] = useState([]);

  const [{ loading, data }, refreshTweets] = useAxios({
    url: import.meta.env.VITE_API_URL + `/users/${auth._id}/timeline`,
    method: 'GET',
    data: { offset },
    headers: { Authorization: authHeader }
  });

  useEffect(() => {
    if (data?.tweets) setTweets(data?.tweets);
  }, [data]);

  return (
    <>
      <TimelineContext.Provider value={{ loading, tweets, setTweets, offset, setOffset, refreshTweets }}>
        <Wrapper>
          <Toaster position="top center" toastOptions={toastOptions} />
          <Navbar />
          <Feed />
          <Discover />
          <PopUpTweetForm replyTo={replyTo} setIsOpen={setModalIsOpen} isOpen={modalIsOpen} />
        </Wrapper>
      </TimelineContext.Provider>
    </>
  );
};

export default Timeline;

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
