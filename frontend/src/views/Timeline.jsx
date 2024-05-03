import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import useAxios from 'axios-hooks';
import { useState, useEffect } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import Discover from '../components/Discover';

const Timeline = () => {
  return (
    <>
      <Wrapper>
        <Toaster position="top center" />
        <Navbar />
        <Feed />
        <Discover />
      </Wrapper>
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
