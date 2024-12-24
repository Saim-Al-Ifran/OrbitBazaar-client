// components/Sidebar.tsx
import React, { useState } from 'react';

interface SidebarProps {
  isActive: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isActive }) => {
  const [active, setActive] = useState('');
  return (
    <aside
      className={`sm:w-64 w-full bg-[#384B70] text-white space-y-6 py-7 px-2 fixed top-16 h-[calc(100%-64px)] transform transition-transform ${
        isActive ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="text-center text-xl font-semibold">Admin Panel</div>
      <nav>
        <a
          href="#"
          onClick={() => setActive('Dashboard')}
          className={`py-2 px-4 rounded-md flex items-center ${
            active === 'Dashboard' ? 'bg-[#789DBC] text-white' : 'hover:bg-[#789DBC]'
          }`}
        >
          <i className="fas fa-tachometer-alt mr-3"></i>
          <span>Dashboard</span>
        </a>

        <a
          href="#"
          onClick={() => setActive('Users')}
          className={`py-2 px-4 rounded-md flex items-center ${
            active === 'Users' ? 'bg-[#789DBC] text-white' : 'hover:bg-[#789DBC]'
          }`}
        >
          <i className="fas fa-users mr-3"></i>
          <span>Users</span>
        </a>

        <a
          href="#"
          onClick={() => setActive('Settings')}
          className={`py-2 px-4 rounded-md flex items-center ${
            active === 'Settings' ? 'bg-[#789DBC] text-white' : 'hover:bg-[#789DBC]'
          }`}
        >
          <i className="fas fa-cog mr-3"></i>
          <span>Settings</span>
        </a>

        <a
          href="#"
          onClick={() => setActive('Analytics')}
          className={`py-2 px-4 rounded-md flex items-center ${
            active === 'Analytics' ? 'bg-[#789DBC] text-white' : 'hover:bg-[#789DBC]'
          }`}
        >
          <i className="fas fa-chart-line mr-3"></i>
          <span>Analytics</span>
        </a>
 
    </nav>

      <div className="Dashboard-logout ">
        <a
          href="#"
          className="  py-2 px-4 hover:bg-[#7AB2D3] bg-[#789DBC] rounded-md flex items-center justify-center"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
