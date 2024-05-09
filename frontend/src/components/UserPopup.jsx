import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Button as DefaultButton } from './Actions';
import defaultPP from '../assets/profilePic.jpg';

const UserPopup = ({ user }) => {
  return (
    <>
      <Wrapper>
        <div className="header">
          <div className="profile-pic-container">
            <Link to={'/' + user.username}>
              <div className="profile-pic">
                <img src={user.profilePic || defaultPP} />
              </div>
            </Link>
            <Button>Follow</Button>
          </div>
          <div className="username">
            <Link to={'/' + user.username}>
              <span>{user.displayName}</span>
              <span>@{user.username}</span>
            </Link>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default UserPopup;

const Wrapper = styled.div`
  padding: 1rem;
  border-radius: 2rem;

  & > .header {
    & > .profile-pic-container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 3rem;

      & .profile-pic {
        display: flex;
        max-width: 5rem;
        flex-direction: column;
        position: relative;

        & img {
          border-radius: 50%;
          max-width: inherit;
          object-fit: contain;
          height: inherit;
        }
      }
    }
  }
`;

const Button = styled(DefaultButton)`
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  align-self: flex-start;
  font-weight: 700;
`;
