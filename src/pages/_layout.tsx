import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/header/header';
import { useInitializer } from '@core/init/useInitializer';

const Layout: React.FC = () => {
  const isInitialized = useInitializer();

  if (!isInitialized) {
    return <></>;
  }

  return (
    <div
      className="flex flex-col items-center"
      style={{
        background: 'linear-gradient(to left, #ff9966, #ff5e62)',
      }}
    >
      <div className="sm:max-w-4xl px-6 w-full">
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
