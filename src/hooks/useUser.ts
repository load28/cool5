import { useCallback, useEffect } from 'react';
import useAppNavigator from '../core/navigator/useNavigator';
import { useUserStore } from '../core/stores/user';
import { getSessionUser } from '../core/supabase/supabase-auth';

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
