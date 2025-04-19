// components/Navbar.tsx
import React from "react";
import { useGetUserProfileQuery } from "../../features/user/userApi";
import avatar from "../../assets/userAvatar.png";

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const TopNavbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const { data: userData, isLoading } = useGetUserProfileQuery({});

  const user = userData?.data;

  return (
    <nav className="bg-[#5a75aa] p-4 shadow-md flex justify-between items-center fixed top-0 w-full z-50">
      <div className="text-white text-lg font-bold">Dashboard</div>
      <div className="space-x-4 flex items-center gap-2">
        {!isLoading && user && (
          <div className="flex items-center gap-2 text-white">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white">
              <img
                src={avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden sm:block font-medium">{user?.name}</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl block md:hidden"
        >
          <i className={`fas ${isSidebarOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;
