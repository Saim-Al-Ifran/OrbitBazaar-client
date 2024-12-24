import React, { useState } from 'react';
import TopNavbar from '../components/Dashboard/TopNavbar';
import Sidebar from '../components/Dashboard/Sidebar';
import '../styles/dashboard.style.css'; 

 
 
const Dashboard: React.FC = () => {
    const [isSidebarActive, setSidebarActive] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarActive((prev) => !prev);
    };
  
    return (
      <>
       
   
        <div className="bg-gray-100">
          <TopNavbar toggleSidebar={toggleSidebar}/>
        <div className="flex">
          <Sidebar isActive={isSidebarActive} />
          <main className="ml-64 p-6">
   
          </main>
        </div>
      </div>
      </>
    )
  }
  
  export default Dashboard