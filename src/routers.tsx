import { Navigate, createBrowserRouter } from 'react-router-dom';
import GlobalLayout from './pages/_layout';
import AuthIndex from './pages/auth/index.tsx';
import { getSessionUser } from './pages/auth/supabase.ts';
import LoginIndex from './pages/login/index.tsx';
import RedstaurnatId from './pages/restaurant-of-friends/[id].tsx';
import RestaurantOfFriendsIndex from './pages/restaurant-of-friends/index.tsx';

export const routes = createBrowserRouter([
  {
    path: '/',
    loader: async () => {
      const userInfo = await getSessionUser();
      return {
        userInfo,
      };
    },
    element: <GlobalLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to={'/feed'} />,
      },
      {
        path: '/feed',
        element: <RestaurantOfFriendsIndex />,
        index: true,
      },
      {
        path: '/feed/:id',
        element: <RedstaurnatId />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginIndex />,
  },
  {
    path: '/auth',
    element: <AuthIndex />,
  },
  {
    path: '/auth/callback',
    element: <Navigate to={'/'} />,
  },
]);

export const pages = [{ route: '/' }, { route: '/feed' }, { route: '/feed/:id' }];
