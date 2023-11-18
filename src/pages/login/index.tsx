import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/user';
import BaseButton from '../../ui/button/base-button';

const LoginIndex: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/feed');
    }
  }, []);

  const loginHandelder = () => {
    navigate('/auth');
  };

  return (
    <div>
      <button onClick={loginHandelder}>Kakao login</button>
      <BaseButton text="Kakao login" />
    </div>
  );
};

export default LoginIndex;
