import React, { useState } from "react";
import AdminNav from "./admin/AdminNav";
import VendorNav from "./vendor/VendorNav";


interface SidebarProps {
  isActive: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isActive }) => {
  const [active, setActive] = useState("");
  const role = "vendor";  

  return (
    <aside
      className={`sm:w-64 w-full bg-[#384B70] text-white space-y-6 py-7 px-2 fixed top-16 h-[calc(100%-64px)] transform transition-transform ${
        isActive ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="text-center text-xl font-semibold">Admin Panel</div>

      {role === "admin" && <AdminNav active={active} setActive={setActive} />}
      {role === "vendor" && <VendorNav active={active} setActive={setActive} />}

      <div className="Dashboard-logout">
        <a
          href="#"
          className="py-2 px-4 hover:bg-[#7AB2D3] bg-[#789DBC] rounded-md flex items-center justify-center"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
