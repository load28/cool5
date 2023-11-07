import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { QueryKeys } from '../../query-client';
import { useUserStore } from '../../stores/user';

const Auth = () => {
  const navigate = useNavigate();
  const addUser = useUserStore((state) => state.updateUser);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');

  if (!code) {
    return <div>login fail</div>;
  }

  const { data, isLoading } = useQuery<any>(QueryKeys.AUTH_INFO, async () => {
    const res = await fetch('http://localhost:3000/auth?code=' + code, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.json();
  });

  const { data: userInfo, isLoading: isUserLoading } = useQuery<any>({
    queryKey: QueryKeys.USER_INFO,
    queryFn: async () => {
      const res = await fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });

      return res.json();
    },
    enabled: !!data,
  });

  if (isLoading || isUserLoading) {
    return <div>Login 중입니다.</div>;
  }

  if (!data || !userInfo) {
    return <div>로그인에 실패했습니다.</div>;
  }

  addUser({
    id: userInfo.id,
    email: userInfo.kakao_account.email,
    name: userInfo.kakao_account.profile.nickname,
    profileImageUrl: userInfo.kakao_account.profile.profile_image_url,
  });

  setTimeout(() => {
    navigate('/feed');
  }, 1000);

  return <div>로그인에 성공했습니다.</div>;
};

export default Auth;
