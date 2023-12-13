import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import { useInitializer } from '../hooks/useInitializer';

const Layout: React.FC = () => {
  const isInitialized = useInitializer();

  if (!isInitialized) {
    return <div>loading...</div>;
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
