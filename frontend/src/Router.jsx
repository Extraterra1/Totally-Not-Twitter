import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import { useContext, createContext, useState } from 'react';

import Landing from './views/Landing';
import Timeline from './views/Timeline';
import Profile from './views/Profile';
import Search from './views/Search';
import Explore from './views/Explore';
import TweetDetail from './views/TweetDetail';

const GlobalContext = createContext();

export const useGlobal = () => {
  return useContext(GlobalContext);
};

const Router = () => {
  const [replyTo, setReplyTo] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openTweetModal = (reply) => {
    setReplyTo(reply);
    setModalIsOpen(true);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />
    },
    {
      element: <AuthOutlet fallbackPath="/" />,
      children: [
        {
          path: '/timeline',
          element: <Timeline />
        },
        {
          path: '/explore',
          element: <Explore />
        }
      ]
    },
    {
      path: '/search',
      element: <Search />
    },
    {
      path: '/:username',
      element: <Profile />
    },
    {
      path: '/:username/status/:tweetID',
      element: <TweetDetail />
    }
  ]);

  return (
    <GlobalContext.Provider value={{ replyTo, openTweetModal, modalIsOpen, setModalIsOpen }}>
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  );
};

export default Router;
