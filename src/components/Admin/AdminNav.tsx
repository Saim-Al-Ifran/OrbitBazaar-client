import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface AdminNavProps {
  active: string;
  setActive: (section: string) => void;
}

const AdminNav: React.FC<AdminNavProps> = ({ active, setActive }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const location = useLocation()
  const toggleSection = (section: string) => {
    setActiveSection(prevSection => (prevSection === section ? null : section));
  };
  return (
    <nav className="space-y-2">
      {/* Dashboard */}
      <NavLink
        to="/dashboard"
        onClick={() => setActive("Dashboard")}
        className={`py-2 px-4 flex items-center justify-between rounded-md ${
          active === "Dashboard" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <div className="flex items-center gap-3">
          <i className="fas fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </div>
      </NavLink>

      {/* Users */}
      <NavLink
        to="/dashboard/users"
        onClick={() => setActive("Users")}
        className={`py-2 px-4 flex items-center justify-between rounded-md ${
          active === "Users" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <div className="flex items-center gap-3">
          <i className="fas fa-users"></i>
          <span>Users</span>
        </div>
      </NavLink>
 

      {/* Sellers */}
      <NavLink
        to="/dashboard/sellers"
        onClick={() => setActive("Sellers")}
        className={`py-2 px-4 flex items-center justify-between rounded-md ${
          active === "Sellers" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-user-tie"></i>
          <span>Sellers</span>
        </div>
      </NavLink>

      {/* Sellers Request */}
      <NavLink
        to="/dashboard/sellers/request"
        onClick={() => setActive("Sellers-request")}
        className={`py-2 px-4 flex items-center justify-between rounded-md ${
          active === "Sellers-request" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-users-gear"></i>
          <span>Sellers Request</span>
        </div>
      </NavLink>

      {/* Deactive Sellers */}
      <NavLink
        to="/dashboard/sellers/deactive"
        onClick={() => setActive("Deactive-sellers")}
        className={`py-2 px-4 flex items-center justify-between rounded-md ${
          active === "Deactive-sellers" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-user-minus"></i>
          <span>Deactive Sellers</span>
        </div>
      </NavLink>

      {/* Categories with Dropdown */}
      <div>
        <a
          href="#"
          onClick={() => toggleSection("Categories")}
          className={`py-2 px-4 flex items-center justify-between rounded-md ${
            active === "Categories" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
          }`}
        >
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-layer-group"></i>
            <span>Category</span>
          </div>
          <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${
            activeSection === "Categories" ? "rotate-180" : ""
          }`}></i>
        </a>

        {/* Dropdown Items */}
        {activeSection === "Categories" && (
          <div className="ml-6 space-y-2">
            <NavLink
              to="/dashboard/categories"
              onClick={() => setActive("AllCategories")}
              className={`py-1 px-4 flex items-center gap-3 rounded-md ${
                location.pathname === "/dashboard/categories" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
              }`}
            >
              <i className="fa-solid fa-list"></i>
              <span>All Categories</span>
            </NavLink>
            <NavLink
              to="/dashboard/category/add"
              onClick={() => setActive("AddCategory")}
              className={`py-1 px-4 flex items-center gap-3 rounded-md ${
                location.pathname === "/dashboard/category/add" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
              }`}
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add Category</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNav;
