import { useCallback, useEffect } from 'react';
import { useUserStore } from '../stores/user';
import { getSessionUser } from './supabase-auth';
import useAppNavigator from './useNavigator';

export const useUser = () => {
  const { onNavigate } = useAppNavigator();
  const userInfo = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);

  const getUserInfo = useCallback(async () => await getSessionUser(), []);

  useEffect(() => {
    if (userInfo) {
      return;
    }

    getUserInfo().then((sessionUserInfo) => {
      if (!sessionUserInfo) {
        onNavigate({ type: 'login', queryString: {} });
        return;
      }

      updateUser({
        id: sessionUserInfo.id,
        email: sessionUserInfo.email,
        name: sessionUserInfo.user_metadata.full_name,
        profileImageUrl: sessionUserInfo.user_metadata.avatar_url,
      });
    });
  }, [getUserInfo]);

  return userInfo;
};
