import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Landing from './components/Landing';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
