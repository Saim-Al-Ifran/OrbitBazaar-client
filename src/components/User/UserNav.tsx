import React from "react";
import { NavLink, useLocation } from "react-router-dom";

// Define the navigation items array for User
const navItems = [
  { to: "/dashboard/user/home", label: "User Dashboard", icon: "fas fa-tachometer-alt" },
  { to: "/dashboard/user/profile", label: "Profile", icon: "fa-solid fa-user" },
  { to: "/dashboard/user/reports", label: "My Reports", icon: "fa-solid fa-flag" },
  { to: "/dashboard/user/orders", label: "My Orders", icon: "fa-solid fa-cart-plus" },
  { to: "/dashboard/user/reviews", label: "Ratings & Reviews", icon: "fa-solid fa-list-check" },
  { to: "/dashboard/user/change-password", label: "Change Password", icon: "fa-solid fa-key" },
];

const UserNav: React.FC = () => {
  const location = useLocation();

  // Color constants
  const activeBgColor = "bg-[#53d0d580]";
  const hoverBgColor = "hover:bg-[#53d0d580]";

  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
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
    </nav>
  );
};

export default UserNav;
