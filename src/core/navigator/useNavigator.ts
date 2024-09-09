import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type TRouteInfo<T, Q> = {
  type: T;
  queryString: Q;
};

type TRooteRoute = TRouteInfo<'root', NonNullable<unknown>>;
type TFeedListRoute = TRouteInfo<'feedList', NonNullable<unknown>>;
type TCreateShareRoute = TRouteInfo<'createShare', NonNullable<unknown>>;
type TLoginRoute = TRouteInfo<'login', NonNullable<unknown>>;

type TNavigationAction = TFeedListRoute | TCreateShareRoute | TLoginRoute | TRooteRoute;

const NAVIGATION_ACTIONS: Record<TNavigationAction['type'], string> = {
  root: '/',
  feedList: '/feed',
  createShare: '/feed/create_share',
  login: '/login',
};

const useAppNavigator = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onNavigate = useCallback(
    ({ type, queryString: data }: TNavigationAction) => {
      const path = NAVIGATION_ACTIONS[type];
      if (!data) {
        navigate(path);
        return;
      }

      const queryString = Object.entries(data)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      navigate(`${path}?${queryString}`);
    },
    [navigate]
  );

  const getQueryString = useCallback(() => {
    return Object.fromEntries(new URLSearchParams(location.search));
  }, [location.search]);

  return {
    onNavigate,
    getQueryString,
  };
};

export default useAppNavigator;
