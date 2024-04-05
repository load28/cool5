import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@core/stores/user';
import supabaseClient from '@core/supabase/supabaseClient';
import './UserIcon.scss';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar.tsx';

const UserIcon = () => {
  const supabase = supabaseClient();
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

  return (
    <Avatar onClick={singOut}>
      <AvatarImage src={user.profileImageUrl} alt="user" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default UserIcon;
