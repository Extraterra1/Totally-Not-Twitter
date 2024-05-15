import styled from 'styled-components';
import useAxios from 'axios-hooks';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { ClipLoader } from 'react-spinners';

const WhoToFollow = () => {
  const authHeader = useAuthHeader();
  const [{ loading, data }] = useAxios({ method: 'GET', url: `${import.meta.env.VITE_API_URL}/users/`, headers: { Authorization: authHeader } });
  console.log(data);

  return (
    <Container>
      <h4 className="title">Who to follow</h4>
      <div className="users">
        <ClipLoader className="spinner" loading={loading} size={30} color="var(--twitter-blue)" />
        {!loading && data.map((e) => <span key={e._id}>{e.displayName}</span>)}
      </div>
    </Container>
  );
};

export default WhoToFollow;

const Container = styled.div`
  border: 1px solid var(--gray-dark);
  border-radius: 2rem;
  width: 100%;
  padding: 1rem;

  & > h4.title {
    color: var(--light);
    font-size: 1.8rem;
  }

  & > .users {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    & > .spinner {
      align-self: center;
    }
  }
`;
