import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState, useEffect } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAxios from 'axios-hooks';
import toast from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';

import Modal from './Modal';
import getTimeSinceTweet from '../utils/getTimeSinceTweet';
import { Button as BaseButton } from './Actions';
import defaultPP from '../assets/profilePic.jpg';

const Tweet = ({ tweet, ...props }) => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  const [isLiked, setIsLiked] = useState(tweet.likes.includes(auth._id));
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [likes, setLikes] = useState(null);

  const openModal = () => (isRetweeted ? toast.error('You have already retweeted that') : setIsOpen(true));
  const closeModal = () => setIsOpen(false);

  const [, executeLike] = useAxios({ method: 'PATCH', headers: { Authorization: authHeader } }, { manual: true });
  const [, executeRetweet] = useAxios(
    { url: `${import.meta.env.VITE_API_URL}/tweets`, method: 'POST', headers: { Authorization: authHeader } },
    { manual: true }
  );

  const handleRetweet = async () => {
    if (isRetweeted) {
      toast.error('You have already retweeted that');
      closeModal();
      return;
    }

    const res = await executeRetweet({ data: { tweetType: 'retweet', retweetedTweet: tweet._id } });

    setIsRetweeted(true);

    closeModal();
  };

  const handleLike = async () => {
    const url = import.meta.env.VITE_API_URL + `/tweets/${tweet._id}/like`;
    const res = await executeLike({ url });

    setLikes(res.data.updatedTweet.likes.length);
    setIsLiked(res.data.updatedTweet.likes.includes(auth._id));
  };

  useEffect(() => {
    setLikes(tweet.likes.length);
  }, []);

  return (
    <>
      {!props.$reply && tweet.replyTo && <Tweet $reply tweet={tweet.replyTo} />}
      <Container {...props}>
        <div className="profile-pic">
          <Link to={`/${tweet.author.username}`}>
            <img src={tweet.author.profilePic || defaultPP} alt={`${tweet.author.displayName} Profile Picture`} />
          </Link>
          <div className="separator-container">
            <div className="separator"></div>
          </div>
        </div>

        <div className="content">
          <div className="username">
            <Link to={`/${tweet.author.username}`}>
              <div>
                <span>{tweet.author.displayName}</span>
                <span>@{tweet.author.username}</span>
                <span>·</span>
                <span id={`tweet-${tweet._id}`}>{getTimeSinceTweet(tweet.createdAt)}</span>
                <Tooltip anchorSelect={`#tweet-${tweet._id}`} place="top">
                  {moment(tweet.createdAt).format('MMM DD YYYY HH:mm')}
                </Tooltip>
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
                      <Button onClick={handleRetweet}>Retweet</Button>
                      <Button $cancel onClick={closeModal}>
                        Cancel
                      </Button>
                    </div>
                  </ModalContainer>
                </Modal>
              )}
            </span>
            <span>
              <Icon className={`like-icon ${isLiked ? 'fill' : null}`} icon={isLiked ? 'bxs-heart' : 'bx:heart'} onClick={handleLike} />
              <span className="like-count">{likes || null}</span>
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
  border-bottom: ${(props) => (props.$reply ? 'none' : '1px solid var(--gray-dark)')};
  padding: 1rem;

  display: grid;
  grid-template-columns: auto 1fr;

  color: var(--light);
  font-size: 1.5rem;

  & .profile-pic {
    display: flex;
    max-width: 3rem;
    flex-direction: column;
    position: relative;

    & a,
    img {
      border-radius: 50%;
      max-width: inherit;
      object-fit: contain;
      height: inherit;
    }

    & .separator-container {
      align-self: center;
      position: relative;
      flex-grow: 1;
    }

    & .separator {
      width: 1px;
      height: calc(100% + 1rem);
      background-color: var(--gray);

      position: absolute;

      display: ${(props) => (props.$reply ? 'block' : 'none')};
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

      & .like-count {
        min-width: 3ch;
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
