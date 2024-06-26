import { createBrowserRouter, Navigate } from 'react-router-dom';
import Callback from '@components/callback/Callback.tsx';
import GlobalLayout from '@pages/_layout';
import AuthIndex from '@pages/auth/index.tsx';
import CreateShare from '@pages/create-share/index.tsx';
import LoginIndex from '@pages/login/index.tsx';
import RedstaurnatId from '@pages/restaurant-of-friends/[id].tsx';
import RestaurantOfFriendsIndex from '@pages/restaurant-of-friends/index.tsx';
import Feeds from '@pages/feed/Feeds';

export const routes = createBrowserRouter([
  {
    path: '/',
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
      {
        path: '/feed/create_share',
        element: <CreateShare />,
      },
      {
        path: '/feeds',
        element: <Feeds />,
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
    element: <Callback />,
  },
]);

export const pages = [{ route: '/' }, { route: '/feed' }, { route: '/feed/:id' }];
