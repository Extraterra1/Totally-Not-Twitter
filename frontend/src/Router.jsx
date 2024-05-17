import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';

import Landing from './views/Landing';
import Timeline from './views/Timeline';
import Profile from './views/Profile';

const Router = () => {
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
        }
      ]
    },
    {
      path: '/:username',
      element: <Profile />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
