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
            <h4 className="title">Who to follow</h4>
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
    border: 1px solid var(--gray-dark);
    border-radius: 2rem;
    width: 100%;
    padding: 1rem;

    & > h4.title {
      color: var(--light);
      font-size: 1.8rem;
    }
  }
`;
