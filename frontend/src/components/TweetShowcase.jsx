import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';

import UserPopup from './UserPopup';

import defaultPP from '../assets/profilePic.jpg';

const TweetShowcase = () => {
  const { tweetID } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const [{ loading, data, error }] = useAxios({ url: `${import.meta.env.VITE_API_URL}/tweets/${tweetID}`, method: 'GET' });

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
                <div className="actions"></div>
              </div>
            </div>
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
      }
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
