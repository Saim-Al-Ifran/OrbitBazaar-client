import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import TopNavbar from "../components/Dashboard/TopNavbar";
 

const Dashboard: React.FC = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    setSidebarActive(false);
  }, [location.pathname]); 

  
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

