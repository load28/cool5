import { Navigate } from 'react-router-dom';
import GlobalLayout from './pages/_layout';
import RedstaurnatId from './pages/restaurant-of-friends/[id].tsx';
import RestaurantOfFriendsIndex from './pages/restaurant-of-friends/index.tsx';
import { useUserStore } from './stores/user.ts';

const loader = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
  }

  return null;
};

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    loader: loader,
    children: [
      {
        path: '',
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
];

export const pages = [{ route: '/' }, { route: '/feed' }, { route: '/feed/:id' }];
