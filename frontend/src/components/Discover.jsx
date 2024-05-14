import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBox from './SearchBox';

const Discover = () => {
  return (
    <>
      <Wrapper>
        <SearchBox />
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
