import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/restaurant-of-friends/header/header';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <Suspense fallback={'loading...'}>
        <div className="sm:max-w-4xl px-6 w-full bg-white">
          <Header></Header>
          <div className="mt-4 lg:mt-16"></div>
          <div className="mt-4 lg:mt-16">
            <Outlet />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Layout;
