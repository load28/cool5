import React, { useEffect } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import Header from '../components/restaurant-of-friends/header/header';
import { useUserStore } from '../stores/user';

const Layout: React.FC = () => {
  const updateUser = useUserStore((state) => state.updateUser);
  const { userInfo } = useLoaderData() as { userInfo: any };

  useEffect(() => {
    if (userInfo) {
      updateUser({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.user_metadata.full_name,
        profileImageUrl: userInfo.user_metadata.avatar_url,
      });
    }
  }, [userInfo]);

  return (
    <div className="flex flex-col items-center">
      <div className="sm:max-w-4xl px-6 w-full bg-white">
        <Header></Header>
        <div className="mt-4 lg:mt-16"></div>
        <div className="mt-4 lg:mt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
