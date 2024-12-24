// components/Navbar.tsx
import React from 'react';

interface NavbarProps {
  toggleSidebar: () => void;
}

const TopNavbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="bg-[#5a75aa] p-4 shadow-md flex justify-between items-center fixed top-0 w-full z-50">
      <div className="text-white text-lg font-bold">Dashboard</div>
      <div className="space-x-4 flex items-center gap-1">
        <input
          type="text"
          placeholder="Search"
          className="p-2 rounded-md hidden md:inline-block"
        />
        <div className="flex items-center">
          <div className="bg-white text-blue-600 text-2xl flex justify-center items-center w-[40px] h-[40px] cursor-pointer rounded-full">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl block md:hidden"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;
