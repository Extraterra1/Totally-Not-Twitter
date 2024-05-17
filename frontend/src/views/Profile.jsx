import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import Discover from '../components/Discover';

const Profile = () => {
  const { username } = useParams();

  return (
    <Wrapper>
      <div className=""></div>
      <h1>{username}</h1>
      <div className=""></div>
    </Wrapper>
  );
};

export default Profile;

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
