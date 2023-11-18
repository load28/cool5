import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/user';

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
    </div>
  );
};

export default LoginIndex;
