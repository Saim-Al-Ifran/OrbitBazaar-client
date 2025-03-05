import React from "react";

interface AdminNavProps {
  active: string;
  setActive: (section: string) => void;
}

const AdminNav: React.FC<AdminNavProps> = ({ active, setActive }) => {
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
        <span>Dashboard</span>
      </a>

      <a
        href="#"
        onClick={() => setActive("Users")}
        className={`py-2 px-4 rounded-md flex items-center ${
          active === "Users" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <i className="fas fa-users mr-3"></i>
        <span>Users</span>
      </a>
      <a
        href="#"
        onClick={() => setActive("Sellers")}
        className={`py-2 px-4 rounded-md flex items-center ${
          active === "Sellers" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <i className="fa-solid fa-user-tie mr-3"></i>
        <span>Sellers</span>
      </a>
      <a
        href="#"
        onClick={() => setActive("Sellers-request")}
        className={`py-2 px-4 rounded-md flex items-center ${
          active === "Sellers-request" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <i className="fa-solid fa-users-gear mr-3"></i>
        <span>Sellers Request</span>
      </a>
      <a
        href="#"
        onClick={() => setActive("Deactive-sellers")}
        className={`py-2 px-4 rounded-md flex items-center ${
          active === "Deactive-sellers" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
        <i className="fa-solid fa-user-minus mr-3"></i>
        <span>Deactive Sellers</span>
      </a>
      <a
        href="#"
        onClick={() => setActive("Categories")}
        className={`py-2 px-4 rounded-md flex items-center ${
          active === "Categories" ? "bg-[#789DBC] text-white" : "hover:bg-[#789DBC]"
        }`}
      >
       <i className="fa-solid fa-list mr-3"></i>
        <span>Categories</span>
      </a>

    </nav>
  );
};

export default AdminNav;
