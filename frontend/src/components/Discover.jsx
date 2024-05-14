import styled from 'styled-components';
import { useState } from 'react';

const Discover = () => {
  const [search, setSearch] = useState(null);

  const handleChange = (e) => setSearch(e.target.value);

  return (
    <>
      <Wrapper>
        <div className="search-box">
          <input type="text" name="search" value={search} placeholder="Search" />
        </div>
      </Wrapper>
    </>
  );
};

export default Discover;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  & > .search-box {
    margin-top: 1rem;
  }
`;
