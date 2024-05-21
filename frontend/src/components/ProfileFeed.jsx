import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';

const ProfileFeed = () => {
  const { username } = useParams();
  const [{ data, loading, error }] = useAxios({ url: `${import.meta.env.VITE_API_URL}/users/${username}`, method: 'GET' });
};

export default ProfileFeed;
