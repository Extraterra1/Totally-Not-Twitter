import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';
import { useState, useEffect } from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import toast from 'react-hot-toast';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

import { useGlobal } from '../Router';

import Modal from './Modal';
import UserPopup from './UserPopup';
import Tweet, { ModalContainer, modalStyles, Button } from './Tweet';

import defaultPP from '../assets/profilePic.jpg';

const TweetShowcase = () => {
  const { tweetID } = useParams();
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const { openTweetModal } = useGlobal();

  const handleBackClick = () => navigate(-1);

  const [{ loading, data, error }] = useAxios({ url: `${import.meta.env.VITE_API_URL}/tweets/${tweetID}`, method: 'GET' });
  const [, executeLike] = useAxios({ method: 'PATCH', headers: { Authorization: authHeader } }, { manual: true });
  const [, executeRetweet] = useAxios(
    { url: `${import.meta.env.VITE_API_URL}/tweets`, method: 'POST', headers: { Authorization: authHeader } },
    { manual: true }
  );

  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    if (data) {
      setLikes(data.tweet.likes.length);
      setIsLiked(data.tweet.likes.includes(auth._id));
    }
  }, [data]);

  const openModal = () => (isRetweeted ? toast.error('You have already retweeted that') : setIsOpen(true));
  const closeModal = () => setIsOpen(false);

  const handleReply = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) return;
    openTweetModal(data.tweet);
  };

  const handleRTClick = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) return;
    openModal();
  };

  const handleRetweetModal = async () => {
    if (isRetweeted) {
      toast.error('You have already retweeted that');
      closeModal();
      return;
    }
    const res = await executeRetweet({ data: { tweetType: 'retweet', retweetedTweet: data.tweet._id } });
    setIsRetweeted(true);
    toast.success('Retweeted!');
    closeModal();
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) return;

    const url = import.meta.env.VITE_API_URL + `/tweets/${data.tweet._id}/like`;
    const res = await executeLike({ url });

    setLikes(res.data.updatedTweet.likes.length);
    if (isAuthenticated) setIsLiked(res.data.updatedTweet.likes.includes(auth._id));
  };

  if (error)
    return (
      <Container>
        <div className="header">
          <Icon onClick={handleBackClick} className="back-icon" icon="ph:arrow-bend-up-left-bold" />
          <span>Tweet</span>
        </div>
        <div className="content">
          <div className="error-message">
            <span>Hmm...this page doesn't exist. Try searching for something else.</span>
            <Link className="search-button" to={'/search'}>
              Search
            </Link>
          </div>
        </div>
      </Container>
    );

  return (
    <>
      {!loading ? (
        <Tooltip
          id={`user-popup-${data.tweet._id}`}
          style={{ padding: 0, background: 'transparent', marginLeft: '2rem' }}
          delayShow={500}
          delayHide={0}
          clickable
          noArrow
          opacity={1}
          place="bottom-start"
        >
          <UserPopup user={data.tweet.author} />
        </Tooltip>
      ) : null}
      <Container>
        <div className="header">
          <Icon onClick={handleBackClick} className="back-icon" icon="ph:arrow-bend-up-left-bold" />
          <span>Tweet</span>
        </div>
        <div className="content">
          {loading ? (
            <ClipLoader className="spinner" loading={loading} color="var(--twitter-blue)" size={45} />
          ) : (
            <>
              {data.tweet.tweetType === 'reply' ? (
                <div style={{ paddingLeft: '2rem' }}>
                  <Tweet $reply tweet={data.tweet.replyTo} update={false} />
                </div>
              ) : null}
              <div className="tweet">
                <div className="header" data-tooltip-id={`user-popup-${data.tweet._id}`}>
                  <div className="profile-pic">
                    <img src={data.tweet.author.profilePic || defaultPP} />
                  </div>
                  <div className="user">
                    <span>{data.tweet.author.displayName}</span>
                    <span>@{data.tweet.author.username}</span>
                  </div>
                </div>
                <div className="content">
                  <div className="text">
                    <span>{data.tweet.content}</span>
                  </div>
                  {data.tweet.imgUrl && (
                    <div className="image">
                      <img className="tweet-img" src={data.tweet.imgUrl} alt="" />
                    </div>
                  )}
                  <div className="date">
                    <span>{moment(data.tweet.createdAt).format('h:mm A · MMM D, YYYY')}</span>
                  </div>
                  <div className="actions">
                    <span onClick={handleReply}>
                      <Icon className="replies-icon icon" icon="bx:message-rounded" />
                    </span>
                    <span>
                      <Icon onClick={handleRTClick} className={`retweet-icon ${isRetweeted ? 'fill' : null}`} icon="bx:repost" />
                      {isOpen && (
                        <Modal isOpen={isOpen} setIsOpen={setIsOpen} style={modalStyles}>
                          <ModalContainer onClick={(e) => e.stopPropagation()}>
                            <h4>Are you sure you want to retweet that?</h4>
                            <div className="buttons">
                              <Button onClick={handleRetweetModal}>Retweet</Button>
                              <Button $cancel onClick={closeModal}>
                                Cancel
                              </Button>
                            </div>
                          </ModalContainer>
                        </Modal>
                      )}
                    </span>
                    <span>
                      <Icon onClick={handleLike} className={`like-icon ${isLiked ? 'fill' : null}`} icon={isLiked ? 'bxs-heart' : 'bx:heart'} />
                      <span className="like-count">{likes || null}</span>
                    </span>
                  </div>
                </div>
              </div>
              {data.replies.length > 0 ? (
                <div className="replies">
                  {data.replies.map((e) => (
                    <Tweet tweet={{ ...e, tweetType: 'tweet' }} update={false} key={e._id} />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default TweetShowcase;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--gray-dark);
  border-right: 1px solid var(--gray-dark);

  & > .header {
    display: flex;
    align-items: center;
    gap: 3rem;
    color: var(--light);
    padding: 1rem;

    & > span {
      font-size: 1.7rem;
      font-weight: 700;
    }

    & > .back-icon {
      font-size: 2rem;
      cursor: pointer;
    }
  }

  & > .content {
    display: flex;
    flex-direction: column;

    color: var(--light);

    & .spinner {
      align-self: center;
      margin-top: 3rem;
    }

    & > .tweet {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      & > .header {
        display: grid;
        grid-template-columns: auto 1fr;
        cursor: pointer;
        padding-left: 1rem;

        & > .profile-pic {
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        & > .user {
          display: flex;
          flex-direction: column;
          margin-left: 1rem;
          justify-content: center;

          & > span:first-child {
            font-weight: 700;
            font-size: 1.5rem;
          }
          & > span:last-child {
            color: var(--gray);
            font-size: 1.3rem;
          }
        }
      }

      & > .content {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        gap: 1rem;

        & > .text {
          font-size: 1.8rem;
        }

        & > .image {
          width: 100%;
          max-height: 40rem;
          overflow: hidden;
          border-radius: 1rem;

          & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        & > .date {
          color: var(--gray);
          font-size: 1.3rem;
        }

        & > .actions {
          display: flex;
          justify-content: space-around;
          padding: 1rem 0;
          border-top: 1px solid var(--gray-dark);
          border-bottom: 1px solid var(--gray-dark);
          font-size: 1.6rem;

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
    }

    & > .replies {
      border-top: 1px solid var(--gray-dark);
    }

    & > .error-message {
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 2rem;

      gap: 2rem;

      & > span {
        font-size: 1.5rem;
      }

      & > .search-button {
        padding: 0.5rem 1.5rem;
        background-color: var(--twitter-blue);
        border-radius: 2rem;
        align-self: center;
        font-size: 1.2rem;
        font-weight: 700;
      }
    }
  }
`;
