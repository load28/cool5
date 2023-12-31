import { useCallback, useEffect } from 'react';
import useAppNavigator from '../navigator/useNavigator';
import { useUserStore } from '../stores/user';
import { getSessionUser } from '../supabase/supabase-auth';

const useUserInit = () => {
  const { onNavigate } = useAppNavigator();
  const userInfo = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);
  const getSessionUserInfo = useCallback(async () => {
    return await getSessionUser();
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      return;
    }

    getSessionUserInfo().then((sessionUserInfo) => {
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
  }, [getSessionUserInfo]);

  return userInfo;
};

export default useUserInit;
