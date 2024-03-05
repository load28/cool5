import { useQuery } from 'react-query';
import { signInWithKaKao } from '@core/supabase/supabase-auth';
import './auth.scss';

const Auth = () => {
  const { data } = useQuery('OAuthLogin', () => {
    return signInWithKaKao();
  });

  return (
    <div className="auth-page">
      <div> {data?.data.provider} 로그인 중</div>
    </div>
  );
};

export default Auth;
