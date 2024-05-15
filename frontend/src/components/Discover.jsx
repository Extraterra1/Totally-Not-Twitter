import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBox from './SearchBox';

const Discover = () => {
  return (
    <>
      <Wrapper>
        <Container>
          <SearchBox />
          <div className="wtf">
            <h1>hey</h1>
          </div>
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

  & > .wtf {
    border: 1px solid var(--gray-light);
    border-radius: 2rem;
    width: 100%;
  }
`;
