import React, {  useEffect } from "react";
import AdminNav from "../Admin/AdminNav";
import VendorNav from "../Vendor/VendorNav";
import UserNav from "../User/UserNav";
import useUserRoles from "../../hooks/auth/useCheckRoles";
import { useLogoutMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiSlice } from "../../features/api/apiSlice";
import { useDispatch } from "react-redux";

interface SidebarProps {
  isActive: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isActive }) => {
 
  const dispatch = useDispatch();
  const { isAdmin, isVendor, isUser, isLoading,isSuperAdmin} = useUserRoles();
  const [logout, { isLoading: logoutLoading, isSuccess: logoutSuccess }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(apiSlice.util.resetApiState());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (logoutSuccess) {
      toast.success("Logout successful!");
      navigate("/");
    }
  }, [logoutSuccess, navigate]);

  // Role-based background color for sidebar
  let roleBasedBgColor = "bg-[#384B70]"; // default
  // Role-based logout button colors
  let logoutBg = "bg-[#789DBC]";
  let logoutHover = "hover:bg-[#7AB2D3]";

  if (isUser) {
    roleBasedBgColor = "bg-[#123458]";
    logoutBg = "bg-[#53d0d580]";
    logoutHover = "hover:bg-[#00dae380]";
  } else if (isVendor) {
    roleBasedBgColor = "bg-[#384B70]";
    logoutBg = "bg-[#789DBC]";
    logoutHover = "hover:bg-[#7AB2D3]";
  } else if (isAdmin || isSuperAdmin) {
    roleBasedBgColor = "bg-[#1F2937]";
    logoutBg = "bg-[#374151]";
    logoutHover = "hover:bg-[#4B5563]";
  }

  return (
    <aside
      className={`sm:w-64 z-10 w-full ${roleBasedBgColor} text-white py-7 px-2 fixed top-16 h-[calc(100%-64px)] transform transition-transform ${
        isActive ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 flex flex-col`}
    >
      <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar">
        <div className="text-center text-xl font-semibold">
          {isAdmin && "Admin Dashboard"}
          {isVendor && "Vendor Dashboard"}
          {isUser && "User Dashboard"}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center pt-10">
            <div className="w-8 h-8 border-4 border-white border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {isAdmin || isSuperAdmin && <AdminNav />}
            {isVendor && <VendorNav   />}
            {isUser && <UserNav />}
          </>
        )}
      </div>

      {/* Logout Button */}
      <div className="py-4 px-2">
        <button
          onClick={handleLogout}
          className={`w-full py-2 px-4 ${logoutBg} ${logoutHover} rounded-md flex items-center justify-center`}
          disabled={logoutLoading}
        >
          {logoutLoading ? (
            <div className="w-5 h-5 border-2 border-white border-dashed rounded-full animate-spin"></div>
          ) : (
            <>
              <i className="fas fa-sign-out-alt mr-2"></i>
              <span>Logout</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
