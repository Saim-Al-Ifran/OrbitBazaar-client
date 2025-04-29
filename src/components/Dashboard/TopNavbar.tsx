// components/Navbar.tsx
import React from "react";
import { useGetUserProfileQuery } from "../../features/user/userApi";
import useUserRoles from "../../hooks/auth/useCheckRoles";
import avatar from "../../assets/userAvatar.png";

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const TopNavbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const { data: userData, isLoading } = useGetUserProfileQuery();
  const { isAdmin, isVendor, isUser,isSuperAdmin } = useUserRoles();

  const user = userData?.data;

  // Dynamic background based on role
  let roleBgColor = "bg-[#5a75aa]"; // default
  if (isUser) roleBgColor = "bg-[#123458]"; // User - Indigo
  else if (isVendor) roleBgColor = "bg-[#5A75AA]"; // Vendor - Gray
  else if (isAdmin || isSuperAdmin) roleBgColor = "bg-[#21324a]"; // Admin - Dark Gray

  return (
    <nav className={`${roleBgColor} p-4 shadow-md flex justify-between items-center fixed top-0 w-full z-50`}>
      <div className="text-white text-lg font-bold">OrbitBazaar</div>
      <div className="space-x-4 flex items-center gap-2">
        {!isLoading && user && (
          <div className="flex items-center gap-2 text-white">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white">
              <img
                src={user?.image || avatar}
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
