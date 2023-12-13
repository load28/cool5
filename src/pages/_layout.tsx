import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import { useUserStore } from '../stores/user';

const Layout: React.FC = () => {
  // const updateUser = useUserStore((state) => state.updateUser);
  const userInfo = useUserStore((state) => state.user);

  // useEffect(() => {
  //   console.log('userInfo', userInfo);

  //   if (userInfo) {
  //     updateUser({
  //       id: userInfo.id,
  //       email: userInfo.email,
  //       name: userInfo.user_metadata.full_name,
  //       profileImageUrl: userInfo.user_metadata.avatar_url,
  //     });
  //   }
  // }, [userInfo]);

  if (!userInfo) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="sm:max-w-4xl px-6 w-full bg-white">
        <Header></Header>
        <div className="mt-4 lg:mt-16"></div>
        <div className="mt-4 lg:mt-16 sh-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
