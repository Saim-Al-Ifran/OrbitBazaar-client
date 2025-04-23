import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface UserNavProps  {
  active: string;
  setActive: (section: string) => void;
}

const UserNav: React.FC<UserNavProps> = ({ active, setActive }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const location = useLocation();
  const toggleSection = (section: string) => {
    setActiveSection(prevSection => (prevSection === section ? null : section));
  };

  return (
    <nav className="space-y-2">
      {/* Dashboard */}
      <NavLink
        to="/dashboard/user/home"
        onClick={() => setActive("Dashboard")}
        className={`py-2 px-4 flex items-center justify-between rounded-md ${
          active === "Dashboard" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <div className="flex items-center gap-3">
          <i className="fas fa-tachometer-alt"></i>
          <span>User Dashboard</span>
        </div>
      </NavLink>

      {/* Products with Dropdown */}
      <div>
        <a
          href="#"
          onClick={() => {
            setActive("Profile");
            toggleSection("Profile");
          }}
          className={`py-2 px-4 flex items-center justify-between rounded-md ${
            active === "Profile" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
          }`}
        >
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-bag-shopping"></i>
            <span>Profile</span>
          </div>
 
        </a>

        {/* Dropdown Items */}
   
      </div>

      {/* Reports */}
      <NavLink
        to="/dashboard/vendor/reports"
        onClick={() => setActive("Reports")}
        className={`py-2 px-4 flex items-center justify-between rounded-md ${
          active === "Reports" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-flag"></i>
          <span>Reports</span>
        </div>
      </NavLink>

      {/* Orders */}
      <NavLink
        to="/dashboard/vendor/orders"
        onClick={() => setActive("Orders")}
        className={`py-2 px-4 flex items-center justify-between rounded-md ${
          active === "Orders" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-cart-plus"></i>
          <span>Orders</span>
        </div>
      </NavLink>
    </nav>
  );
};

export default UserNav;
