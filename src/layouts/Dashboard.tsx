import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import TopNavbar from "../components/Dashboard/TopNavbar";
import useUserRoles from "../hooks/auth/useCheckRoles"; // import your role check hook

const Dashboard: React.FC = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const location = useLocation();

   const { isLoading } = useUserRoles(); // hook to check auth and show loader
 
  useEffect(() => {
    setSidebarActive(false);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      <div className="flex flex-col items-center space-y-4">
        {/* Custom spinning loader */}
        <div className="w-16 h-16 border-4 border-[#31b4ae] border-dashed rounded-full animate-spin "></div>
        
        {/* Loading message */}
        <p className="text-accent-content text-lg font-medium animate-pulse">
          Loading your dashboard...
        </p>
      </div>
    </div>
    );
  }
  

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isActive={sidebarActive} />

      <div className="flex-1 min-h-screen bg-gray-100">
        {/* Top Navbar */}
        <TopNavbar
          toggleSidebar={() => setSidebarActive(!sidebarActive)}
          isSidebarOpen={sidebarActive}
        />

        {/* Main Content */}
        <div className="mt-16 ml-0 md:ml-64 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
