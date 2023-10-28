import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <Suspense fallback={'loading...'}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
