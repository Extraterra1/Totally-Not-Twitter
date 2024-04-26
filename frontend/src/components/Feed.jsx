import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import useAxios from 'axios-hooks';
import { useState, useEffect } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import TweetForm from './TweetForm';
import Tweet from './Tweet';

const Feed = () => {
  const authHeader = useAuthHeader();
  const auth = useAuthUser();

  const [offset, setOffset] = useState(0);
  const [tweets, setTweets] = useState([]);
  const [{ loading, data }, refreshTweets] = useAxios({
    url: import.meta.env.VITE_API_URL + `/users/${auth._id}/timeline`,
    method: 'GET',
    data: { offset },
    headers: { Authorization: authHeader }
  });

  useEffect(() => {
    if (data?.tweets) setTweets(data?.tweets);
  }, [data]);

  return (
    <>
      <Toaster position="top center" />
      <Wrapper>
        <TweetForm />
        <TweetsContainer>
          {tweets.map((e) => (
            <Tweet key={e._id} tweet={e} />
          ))}
        </TweetsContainer>
      </Wrapper>
    </>
  );
};

export default Feed;

const Wrapper = styled.div`
  border-left: 1px solid var(--gray-dark);
  border-right: 1px solid var(--gray-dark);
`;

const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
