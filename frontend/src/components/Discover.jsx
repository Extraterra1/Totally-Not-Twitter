import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBox from './SearchBox';
import WhoToFollow from '../WhoToFollow';

const Discover = () => {
  return (
    <>
      <Wrapper>
        <Container>
          <SearchBox />
          <WhoToFollow />
        </Container>
      </Wrapper>
    </>
  );
};

export default Discover;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
