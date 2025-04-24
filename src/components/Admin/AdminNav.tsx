import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const adminNavItems = [
  { to: "/dashboard", label: "Dashboard", icon: "fas fa-tachometer-alt" },
  { to: "/dashboard/users", label: "Users", icon: "fas fa-users" },
  { to: "/dashboard/sellers", label: "Sellers", icon: "fa-solid fa-user-tie" },
  { to: "/dashboard/sellers/request", label: "Sellers Request", icon: "fa-solid fa-users-gear" },
  { to: "/dashboard/sellers/deactive", label: "Deactive Sellers", icon: "fa-solid fa-user-minus" },
];

const categorySubNavItems = [
  { to: "/dashboard/categories", label: "All Categories", icon: "fa-solid fa-list" },
  { to: "/dashboard/category/add", label: "Add Category", icon: "fa-solid fa-plus" },
];

const AdminNav: React.FC = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const activeBgColor = "bg-[#374151]";
  const hoverBgColor = "hover:bg-[#374151]";

  return (
    <nav className="space-y-2">
      {/* Regular Nav Items */}
      {adminNavItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={`py-2 px-4 flex items-center justify-between rounded-md ${
            location.pathname === item.to ? `${activeBgColor} text-white` : `${hoverBgColor}`
          }`}
        >
          <div className="flex items-center gap-3">
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </div>
        </NavLink>
      ))}

      {/* Category Dropdown */}
      <div>
        <button
          onClick={() => toggleSection("Categories")}
          className={`w-full text-left py-2 px-4 flex items-center justify-between rounded-md ${hoverBgColor}`}
        >
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-layer-group"></i>
            <span>Category</span>
          </div>
          <i
            className={`fa-solid fa-chevron-down transition-transform duration-300 ${
              activeSection === "Categories" ? "rotate-180" : ""
            }`}
          ></i>
        </button>

        {/* Dropdown Items */}
        {activeSection === "Categories" && (
          <div className="ml-6 space-y-2">
            {categorySubNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={`py-1 px-4 flex items-center gap-3 rounded-md ${
                  location.pathname === item.to ? `${activeBgColor} text-white` : `${hoverBgColor}`
                }`}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNav;
