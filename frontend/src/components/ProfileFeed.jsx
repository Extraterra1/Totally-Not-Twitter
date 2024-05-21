import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const ProfileFeed = () => {
  const { username } = useParams();
  const [{ data, loading, error }] = useAxios({ url: `${import.meta.env.VITE_API_URL}/users/${username}`, method: 'GET' });

  if (loading)
    return (
      <Wrapper>
        <ClipLoader className="spinner" loading={loading} color="var(--twitter-blue)" size={45} />
      </Wrapper>
    );

  return (
    <Wrapper>
      <h1>{data.user.username}</h1>
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
`;
