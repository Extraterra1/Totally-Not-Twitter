import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleChange = (e) => setSearch(e.target.value);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && search) {
      navigate(`/search?q=${search}`);
    }
  };

  return (
    <Container>
      <Icon className="search-icon" icon="ph:magnifying-glass" />
      <input type="text" name="search" value={search} placeholder="Search" onChange={handleChange} onKeyDown={handleKeyDown} />
    </Container>
  );
};

export default SearchBox;

const Container = styled.div`
  margin-top: 1rem;
  min-width: 25rem;
  max-width: 40rem;
  padding: 1rem 2rem;
  border-radius: 2rem;
  border: 1px solid transparent;

  background-color: var(--gray-dark);
  position: relative;

  &:has(input:focus) {
    background-color: var(--black);
    border: 1px solid var(--twitter-blue);

    .search-icon {
      color: var(--twitter-blue);
    }
  }

  & > .search-icon {
    position: absolute;
    left: 1rem;
    color: var(--gray-light);
    font-size: 1.5rem;

    top: 50%;
    transform: translateY(-50%);
  }

  & > input {
    width: 100%;
    outline: none;
    border: none;
    background-color: inherit;
    margin-left: 1rem;

    &::placeholder {
      color: var(--gray-light);
    }
  }
`;
