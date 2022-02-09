import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-auto h-auto py-10 bg-slate-900">
      {children}
    </div>
  );
};

export default Layout;
