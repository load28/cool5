import { Navigate } from 'react-router-dom';
import GlobalLayout from './pages/_layout';
import Auth from './pages/auth/index.tsx';
import RedstaurnatId from './pages/restaurant-of-friends/[id].tsx';
import RestaurantOfFriendsIndex from './pages/restaurant-of-friends/index.tsx';

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      {
        path: '',
        element: <Navigate to={'/auth'} />,
      },
      {
        path: '/auth',
        element: <Auth />,
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
];

export const pages = [{ route: '/' }, { route: '/feed' }, { route: '/feed/:id' }];
