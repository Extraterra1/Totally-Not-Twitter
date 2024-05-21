import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import profilePic from '../assets/profilePic.jpg';

const ProfileFeed = () => {
  const { username } = useParams();
  const [{ data, loading, error }] = useAxios({ url: `${import.meta.env.VITE_API_URL}/users/${username}`, method: 'GET' });

  if (loading)
    return (
      <Wrapper>
        <ClipLoader className="spinner" loading={loading} color="var(--twitter-blue)" size={45} />
      </Wrapper>
    );

  // TODO: ERROR HANDLING

  return (
    <Wrapper>
      <div className="header">
        <div className="profile-pic">
          <img src={data.user.profilePic || profilePic} />
          <Button>Follow</Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProfileFeed;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > .spinner {
    align-self: center;
    margin-top: 3rem;
  }

  & > .header {
    padding: 2rem;
    & > .profile-pic {
      display: flex;
      justify-content: space-between;
      align-items: baseline;

      & > img {
        width: 10rem;
        border-radius: 50%;

        object-fit: cover;
      }
    }
  }
`;

const Button = styled.a`
  background-color: var(--light);
  color: var(--dark);
`;
