import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import Modal from './Modal';
import getTimeSinceTweet from '../utils/getTimeSinceTweet';
import { Button as BaseButton } from './Actions';
import defaultPP from '../assets/profilePic.jpg';

const Tweet = ({ tweet }) => {
  const auth = useAuthUser();
  const [isLiked, setIsLiked] = useState(tweet.likes.includes(auth._id));
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Container>
        <Link to={`/${tweet.author.username}`}>
          <div className="profile-pic">
            <img src={tweet.author.profilePic || defaultPP} alt={`${tweet.author.displayName} Profile Picture`} />
          </div>
        </Link>
        <div className="content">
          <div className="username">
            <Link to={`/${tweet.author.username}`}>
              <div>
                <span>{tweet.author.displayName}</span>
                <span>@{tweet.author.username}</span>
                <span>·</span>
                <span>{getTimeSinceTweet(tweet.createdAt)}</span>
              </div>
            </Link>
          </div>
          <div className="text">{tweet.content}</div>
          <div className="actions">
            <Link to={`/tweets/${tweet._id}`}>
              <span>
                <Icon className="replies-icon" icon="bx:message-rounded" />
              </span>
            </Link>
            <span>
              <Icon onClick={openModal} className={`retweet-icon ${isRetweeted ? 'fill' : null}`} icon="bx:repost" />

              {isOpen && (
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} style={modalStyles}>
                  <ModalContainer>
                    <h4>Are you sure you want to retweet that?</h4>
                    <div className="buttons">
                      <Button>Retweet</Button>
                      <Button $cancel onClick={closeModal}>
                        Cancel
                      </Button>
                    </div>
                  </ModalContainer>
                </Modal>
              )}
            </span>
            <span>
              <Icon className={`like-icon ${isLiked ? 'fill' : null}`} icon={isLiked ? 'bxs-heart' : 'bx:heart'} />
              <span>{tweet.likes.length || null}</span>
            </span>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Tweet;

const Button = styled(BaseButton)`
  background-color: ${(props) => (props.$cancel ? 'var(--danger)' : 'var(--twitter-blue)')};
  color: var(--light);

  &:hover {
    background-color: ${(props) => (props.$cancel ? 'var(--like-red)' : 'var(--twitter-blue-hover)')};
  }
`;

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 0,
    backgroundColor: 'var(--black)',
    padding: '0',
    boxShadow: 'rgba(255, 255, 255, 0.2) 0px 0px 15px 0px,rgba(255, 255, 255, 0.15) 0px 0px 3px 1px'
  },
  overlay: {
    backgroundColor: 'transparent'
  }
};

const ModalContainer = styled.div`
  padding: 3rem;
  background-color: var(--black);
  font-size: 2rem;
  color: var(--light);
  border-radius: 2rem;

  & > .buttons {
    display: flex;
    justify-content: space-around;

    margin-top: 2rem;
  }
`;

const Container = styled.div`
  border-bottom: 1px solid var(--gray-dark);
  padding: 1rem;

  display: grid;
  grid-template-columns: auto 1fr;

  color: var(--light);
  font-size: 1.5rem;

  & .profile-pic {
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

  & > .content {
    margin-left: 1rem;
    & > .username {
      & div {
        display: flex;
        gap: 0.5rem;

        & > span:first-child {
          font-weight: 700;

          &:hover {
            text-decoration: underline;
            text-underline-offset: 2px;
          }
        }

        & > span:not(:first-child) {
          color: var(--gray);
        }
      }
    }
    & > .actions {
      display: flex;
      justify-content: space-around;

      margin-top: 1rem;
      font-size: 1.6rem;
      color: var(--gray);

      & > span {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        & > span {
          font-size: 1.4rem;
        }
      }

      & .replies-icon,
      .retweet-icon,
      .like-icon {
        transition: all 0.3s;
        cursor: pointer;
      }

      & .like-icon.fill {
        color: var(--like-red);
      }
      & .retweet-icon.fill {
        color: var(--success);
      }

      & .replies-icon:hover {
        color: var(--twitter-blue);
      }
      & .retweet-icon:hover {
        color: var(--success);
      }
      & .like-icon:hover {
        color: var(--like-red);
      }
    }
  }
`;
