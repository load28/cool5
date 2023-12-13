import { useEffect } from 'react';
import { getSessionUser } from '../../hooks/supabase-auth';
import useAppNavigator from '../../hooks/useNavigator';
import { useUserStore } from '../../stores/user';

const callback = () => {
  const { onNavigate } = useAppNavigator();
  const updateUser = useUserStore((state) => state.updateUser);

  useEffect(() => {
    const getUserInfo = async () => await getSessionUser();
    getUserInfo().then((userInfo) => {
      if (!userInfo) return;

      updateUser({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.user_metadata.full_name,
        profileImageUrl: userInfo.user_metadata.avatar_url,
      });

      onNavigate({ type: 'feedList', queryString: {} });
    });
  }, []);
  return <></>;
};

export default callback;
