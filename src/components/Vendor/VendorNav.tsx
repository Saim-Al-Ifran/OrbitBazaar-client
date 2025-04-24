import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Define the navigation items array for Vendor
const vendorNavItems = [
  { to: "/dashboard/vendor", label: "Vendor Dashboard", icon: "fas fa-tachometer-alt" },
  { to: "/dashboard/vendor/reports", label: "Reports", icon: "fa-solid fa-flag" },
  { to: "/dashboard/vendor/orders", label: "Manage Orders", icon: "fa-solid fa-cart-plus" },
];

const VendorNav: React.FC = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const activeBgColor = "bg-[#789DBC]";
  const hoverBgColor = "hover:bg-[#789DBC]";

  return (
    <nav className="space-y-2">
      {/* Regular Nav Items */}
      {vendorNavItems.map((item) => (
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

      {/* Products with Dropdown */}
      <div>
        <button
          onClick={() => toggleSection("Products")}
          className={`w-full text-left py-2 px-4 flex items-center justify-between rounded-md  ${hoverBgColor}`}
        >
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-bag-shopping"></i>
            <span>Products</span>
          </div>
          <i
            className={`fa-solid fa-chevron-down transition-transform duration-300 ${
              activeSection === "Products" ? "rotate-180" : ""
            }`}
          ></i>
        </button>

        {/* Dropdown Items */}
        {activeSection === "Products" && (
          <div className="ml-6 space-y-2">
            <NavLink
              to="/dashboard/vendor/products"
              className={`py-1 px-4 flex items-center gap-3 rounded-md ${
                location.pathname === "/dashboard/vendor/products" ? `${activeBgColor} text-white` : `${hoverBgColor}`
              }`}
            >
              <i className="fa-solid fa-list"></i>
              <span>All Products</span>
            </NavLink>
            <NavLink
              to="/dashboard/vendor/product/add"
              className={`py-1 px-4 flex items-center gap-3 rounded-md ${
                location.pathname === "/dashboard/vendor/product/add" ? `${activeBgColor} text-white` : `${hoverBgColor}`
              }`}
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add Product</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default VendorNav;
