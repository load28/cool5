import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/user';
import { signInWithKaKao } from './supabase';

const Auth = () => {
  const navigate = useNavigate();
  const updateUser = useUserStore((state) => state.updateUser);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate('/feed');
    } else {
      signInWithKaKao().then((userInfo: any) => {
        updateUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.user_metadata.full_name,
          profileImageUrl: userInfo.user_metadata.avatar_url,
        });
        navigate('/feed');
      });
    }
  }, []);

  return user ? <div>진입 중</div> : <div>로그인 중</div>;
};

export default Auth;
