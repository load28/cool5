import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/user';
import { signInWithKaKao } from './supabase';

const Auth = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate('/');
    } else {
      signInWithKaKao().then();
    }
  }, []);

  return user ? <div>진입 중</div> : <div>로그인 중</div>;
};

export default Auth;
