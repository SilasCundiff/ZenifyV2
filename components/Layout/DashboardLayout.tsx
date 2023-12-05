import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen  text-white flex flex-col justify-between">
      {children}
    </div>
  );
};

export default DashboardLayout;
