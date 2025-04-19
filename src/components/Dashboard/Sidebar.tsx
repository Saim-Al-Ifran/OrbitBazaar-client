import React, { useState } from "react";
import AdminNav from "../Admin/AdminNav";
import VendorNav from "../Vendor/VendorNav";
import useUserRoles from "../../hooks/auth/useCheckRoles";

interface SidebarProps {
  isActive: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isActive }) => {
  const [active, setActive] = useState("");
  const { isAdmin, isVendor, isLoading } = useUserRoles();
  const handleLogout = () => {  
      // TODO: implement actual logout logic
         console.log("Logging out...");
  }
 
  return (
    <aside
      className={`sm:w-64 z-10 w-full bg-[#384B70] text-white py-7 px-2 fixed top-16 h-[calc(100%-64px)] transform transition-transform ${
        isActive ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 flex flex-col`}
    >
      <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar">
        <div className="text-center text-xl font-semibold">
          {isAdmin && "Admin Dashboard"}
          {isVendor && "Vendor Dashboard"}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center pt-10">
            <div className="w-8 h-8 border-4 border-white border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {isAdmin && <AdminNav active={active} setActive={setActive} />}
            {isVendor && <VendorNav active={active} setActive={setActive} />}
          </>
        )}
      </div>

      {/* Logout Button (Fixed at Bottom) */}
      <div className="py-4 px-2">
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 hover:bg-[#7AB2D3] bg-[#789DBC] rounded-md flex items-center justify-center"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
 