import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useGetUserProfileQuery } from "../../features/user/userApi";

const UserNav: React.FC = () => {
  const location = useLocation();

  // Assuming your user state has firebaseUID if logged in via Firebase
  const user = useGetUserProfileQuery();
  const { data: userProfile } = user;
  console.log("userProfile", userProfile);
  

  // Define the navigation items array for User
  const navItems = [
    { to: "/dashboard/user/home", label: "User Dashboard", icon: "fas fa-tachometer-alt" },
    { to: "/dashboard/user/profile", label: "Profile", icon: "fa-solid fa-user" },
    { to: "/dashboard/user/reports", label: "My Reports", icon: "fa-solid fa-flag" },
    { to: "/dashboard/user/orders", label: "My Orders", icon: "fa-solid fa-cart-plus" },
    { to: "/dashboard/user/reviews", label: "Ratings & Reviews", icon: "fa-solid fa-list-check" },
    // Only show "Change Password" if not a Firebase-auth user
    ...(!userProfile?.data?.firebaseUID ? [
      { to: "/dashboard/user/change-password", label: "Change Password", icon: "fa-solid fa-key" },
    ] : [])
  ];

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
