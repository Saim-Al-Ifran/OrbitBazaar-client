import React, { useState } from "react";
import { NavLink } from "react-router-dom";

interface VendorNavProps {
  active: string;
  setActive: (section: string) => void;
}

const VendorNav: React.FC<VendorNavProps> = ({ active, setActive }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(prevSection => (prevSection === section ? null : section));
  };

  return (
    <nav className="space-y-2">
      {/* Dashboard */}
      <NavLink
        to="/dashboard/vendor"
        onClick={() => setActive("Dashboard")}
        className={`py-2 px-4 flex items-center justify-between rounded-md ${
          active === "Dashboard" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <div className="flex items-center gap-3">
          <i className="fas fa-tachometer-alt"></i>
          <span>Dashboard (Vendor)</span>
        </div>
      </NavLink>

      {/* Products with Dropdown */}
      <div>
        <a
          href="#"
          onClick={() => {
            setActive("Products");
            toggleSection("Products");
          }}
          className={`py-2 px-4 flex items-center justify-between rounded-md ${
            active === "Products" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
          }`}
        >
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-bag-shopping"></i>
            <span>Products</span>
          </div>
          <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${
            activeSection === "Products" ? "rotate-180" : ""
          }`}></i>
        </a>

        {/* Dropdown Items */}
        {activeSection === "Products" && (
          <div className="ml-6 space-y-2">
            <NavLink
              to="/dashboard/vendor/products"
              onClick={() => setActive("AllProducts")}
              className={`py-1 px-4 flex items-center gap-3 rounded-md ${
                active === "AllProducts" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
              }`}
            >
              <i className="fa-solid fa-list"></i>
              <span>All Products</span>
            </NavLink>
            <NavLink
              to="/dashboard/vendor/product/add"
              onClick={() => setActive("AddProduct")}
              className={`py-1 px-4 flex items-center gap-3 rounded-md ${
                active === "AddProduct" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
              }`}
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add Product</span>
            </NavLink>
          </div>
        )}
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

export default VendorNav;
