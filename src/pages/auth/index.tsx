import { useUserStore } from '../../stores/user';

const Auth = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
  }

  return <div>Login 중입니다.</div>;
};

export default Auth;
