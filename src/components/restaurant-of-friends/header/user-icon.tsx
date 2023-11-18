import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../../../auth-client';
import { useUserStore } from '../../../stores/user';
import './user-icon.scss';

const UserIcon = () => {
  const supabase = useSupabase();
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  // oauth 요청 URL
  const handleLogin = () => {
    navigate('/auth');
  };

  const singOut = () => {
    supabase.auth.signOut();
    navigate('/feed');
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

  return <img className="user__img" alt="user" src={user.profileImageUrl} onClick={singOut} />;
};

export default UserIcon;
