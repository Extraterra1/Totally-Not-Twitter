import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <RequireAuth fallbackPath="/login">
          <Landing />
        </RequireAuth>
      )
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ]);
};

export default Router;
