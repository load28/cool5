import GlobalLayout from './pages/_layout';
import RestaurantOfFriendsIndex from './pages/restaurant-of-friends/index.tsx';

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [{ path: '/', element: <RestaurantOfFriendsIndex />, index: true }],
  },
];

export const pages = [{ route: '/' }];
