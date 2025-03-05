import React from "react";

interface VendorNavProps {
  active: string;
  setActive: (section: string) => void;
}

const VendorNav: React.FC<VendorNavProps> = ({ active, setActive }) => {
  return (
    <nav>
      <a
        href="#"
        onClick={() => setActive("Dashboard")}
        className={`py-2 px-4 rounded-md flex items-center ${
          active === "Dashboard" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <i className="fas fa-tachometer-alt mr-3"></i>
        <span>Dashboard (Vendor)</span>
      </a>

      <a
        href="#"
        onClick={() => setActive("Products")}
        className={`py-2 px-4 rounded-md flex items-center ${
          active === "Products" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
       <i className="fa-solid fa-box mr-3"></i>
        <span>Products</span>
      </a>
      <a
        href="#"
        onClick={() => setActive("Reports")}
        className={`py-2 px-4 rounded-md flex items-center ${
          active === "Reports" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
       <i className="fa-solid fa-flag mr-3"></i>
        <span>Reports</span>
      </a>
      <a
        href="#"
        onClick={() => setActive("Orders")}
        className={`py-2 px-4 rounded-md flex items-center ${
          active === "Orders" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
       <i className="fa-solid fa-cart-plus mr-3"></i>
        <span>Orders</span>
      </a>
    </nav>
  );
};

export default VendorNav;
