import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState, useRef, useEffect } from 'react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';

import defaultPP from '../assets/profilePic.jpg';

const UserCard = ({ user }) => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  const containerRef = useRef(null);

  // Function to handle clicks outside the popup
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target) && !containerRef.current.contains(event.target)) {
      setOpen(false); // Close the popup if clicked outside
    }
  };

  useEffect(() => {
    // Attach event listener when the popup is open
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const logUserOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <>
      <Wrapper>
        <Container ref={containerRef} onClick={() => setOpen(true)}>
          <div className="profile-pic">
            <img src={user.profilePic || defaultPP} alt="Your profile picture" />
          </div>
          <div className="username-container">
            <div className="username">
              <span className="displayName">{user.displayName}</span>
              <span className="at">@{user.username}</span>
            </div>
            <Icon className="more-icon" icon="ph:dots-three-bold" />
          </div>
        </Container>
        {open && (
          <Popup ref={popupRef} onClick={logUserOut}>
            <Icon className="logout-icon" icon="ph:door-open-bold" />
            <span>Log Out @{user.username}</span>
          </Popup>
        )}
      </Wrapper>
    </>
  );
};

export default UserCard;

const Wrapper = styled.div`
  margin-top: auto;
  align-self: stretch;
  position: relative;
`;

const Container = styled.div`
  display: flex;

  border-radius: 5rem;
  transition: all 0.3s;
  padding: 1rem;
  cursor: pointer;
  gap: 1rem;

  position: relative;

  & > .profile-pic {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & > .username-container {
    flex-grow: 1;
    display: flex;
    align-items: center;
    gap: 1rem;

    & > .username {
      display: flex;
      flex-direction: column;
      font-size: 1.3rem;

      & > .displayName {
        font-weight: 700;
      }

      & > .at {
        color: var(--gray);
      }
    }

    & > .more-icon {
      font-size: 2rem;
      margin-left: auto;
    }
  }

  &:hover {
    background-color: rgba(231, 233, 234, 0.1);
  }
`;

const Popup = styled.div`
  position: absolute;
  bottom: 150%;
  left: 50%;
  transform: translate(-50%, 0);

  background-color: var(--black);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow:
    rgba(255, 255, 255, 0.2) 0px 0px 15px 0px,
    rgba(255, 255, 255, 0.15) 0px 0px 3px 1px;

  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 1.5rem;
  transition: all 0.3s;
  cursor: pointer;

  & > .logout-icon {
    font-size: 2rem;
  }

  & > span {
    white-space: nowrap;
    font-weight: 700;
  }

  &:hover {
    background-color: rgba(231, 233, 234, 0.1);
  }
`;
