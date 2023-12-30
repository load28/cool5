import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../core/stores/user';
import useSupabaseClient from '../../../core/supabase/useSupabaseClient';
import './UserIcon.scss';

const UserIcon = () => {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const deleteUser = useUserStore((state) => state.deleteUser);
  const user = useUserStore((state) => state.user);

  const handleLogin = () => {
    navigate('/auth');
  };

  const singOut = () => {
    supabase.auth.signOut().then(() => {
      deleteUser();
      navigate('/login');
    });
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
