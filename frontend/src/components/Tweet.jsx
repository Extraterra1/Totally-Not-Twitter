import styled from 'styled-components';

import defaultPP from '../assets/profilePic.jpg';

const Tweet = ({ tweet }) => {
  return (
    <>
      <Container>
        <div className="profile-pic">
          <img src={tweet.author.profilePic || defaultPP} alt={`${tweet.author.displayName} Profile Picture`} />
        </div>
        <div className="content">{tweet.content}</div>
      </Container>
    </>
  );
};

export default Tweet;

const Container = styled.div`
  border-bottom: 1px solid var(--gray-dark);
  padding: 1rem;

  display: grid;
  grid-template-columns: auto 1fr;

  & > .profile-pic {
    display: flex;
    align-items: start;
    max-width: 3rem;
    overflow: hidden;

    & img {
      border-radius: 50%;
      max-width: inherit;
      object-fit: contain;
    }
  }
`;
