import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';

import Landing from './views/Landing';
import Actions from './components/Actions';

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
          element: <Actions />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
