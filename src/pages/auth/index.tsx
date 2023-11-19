import { useQuery } from 'react-query';
import { signInWithKaKao } from './supabase';

const Auth = () => {
  const { data } = useQuery('OAuthLogin', () => {
    return signInWithKaKao();
  });

  return <div> {data?.data.provider} 로그인 중</div>;
};

export default Auth;
