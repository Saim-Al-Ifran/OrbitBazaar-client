import React from "react";
import { NavLink } from "react-router-dom";

interface UserNavProps {
  active: string;
  setActive: (section: string) => void;
}

const UserNav: React.FC<UserNavProps> = ({ active, setActive }) => {
  return (
    <nav className="space-y-2">
      {/* User Dashboard */}
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

      {/* Profile */}
      <NavLink
        to="/dashboard/user/profile"
        onClick={() => setActive("Profile")}
        className={`py-2 px-4 flex items-center justify-between rounded-md ${
          active === "Profile" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-user"></i>
          <span>Profile</span>
        </div>
      </NavLink>

      {/* Reports */}
      <NavLink
        to="/dashboard/user/reports"
        onClick={() => setActive("Reports")}
        className={`py-2 px-4 flex items-center justify-between rounded-md ${
          active === "Reports" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-flag"></i>
          <span>My Reports</span>
        </div>
      </NavLink>

      {/* Orders */}
      <NavLink
        to="/dashboard/user/orders"
        onClick={() => setActive("Orders")}
        className={`py-2 px-4 flex items-center justify-between rounded-md ${
          active === "Orders" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-cart-plus"></i>
          <span>My Orders</span>
        </div>
      </NavLink>

     {/* Reviews & ratings */}
      <NavLink
        to="/dashboard/user/reviews"
        onClick={() => setActive("Reviews")}
        className={`py-2 px-4 flex items-center justify-between rounded-md ${
            active === "Reviews" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
        >
        <div className="flex items-center gap-3">
         <i className="fa-solid fa-list-check"></i>
            <span>Ratings & Reviews</span>
        </div>
     </NavLink>
     {/* change password */}
        <NavLink
            to="/dashboard/user/change-password"
            onClick={() => setActive("Change Password")}
            className={`py-2 px-4 flex items-center justify-between rounded-md ${
            active === "Change Password" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
            }`}
        >
            <div className="flex items-center gap-3">
            <i className="fa-solid fa-key"></i>
            <span>Change Password</span>
            </div>
        </NavLink>

    </nav>
  );
};

export default UserNav;
