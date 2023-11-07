import { useUserStore } from '../../../stores/user';
import './user-icon.scss';

const UserIcon = () => {
  const user = useUserStore((state) => state.user);
  const restApiKey = 'd55a59c0b29d8f0969646a5378d5bd8c';
  const redirect_uri = 'http://localhost:5173/auth';
  // oauth 요청 URL
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoLoginUrl;
  };

  if (!user) {
    return (
      <div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </div>
    );
  }

  return <img className="user__img" alt="user" src={user.profileImageUrl} />;
};

export default UserIcon;
