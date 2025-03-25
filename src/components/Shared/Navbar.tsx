import { NavLink } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-black tracking-wide">MyStore</div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 justify-center mx-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 rounded-full border border-black focus:ring-2 focus:ring-black focus:outline-none shadow-md transition-all duration-300"
            />
            <button className="absolute right-3 top-2 text-black hover:text-gray-700 transition-all duration-300">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-x-6 lg:gap-x-10">
          <div className="hidden md:flex gap-x-6 lg:gap-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative font-semibold text-black hover:text-gray-700 transition-all duration-300 ${
                  isActive ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-black after:rounded-full" : ""
                }`
              }
            >
              <i className="fa-solid fa-house mr-1"></i> Home
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `relative font-semibold text-black hover:text-gray-700 transition-all duration-300 ${
                  isActive ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-black after:rounded-full" : ""
                }`
              }
            >
              <i className="fa-solid fa-bag-shopping mr-1"></i> Shop
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative font-semibold text-black hover:text-gray-700 transition-all duration-300 ${
                  isActive ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-black after:rounded-full" : ""
                }`
              }
            >
              <i className="fa-solid fa-phone mr-1"></i> Contact
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative font-semibold text-black hover:text-gray-700 transition-all duration-300 ${
                  isActive ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-black after:rounded-full" : ""
                }`
              }
            >
              <i className="fa-solid fa-circle-info mr-1"></i> About us
            </NavLink>
          </div>

          {/* Cart Icon */}
          <NavLink to="/cart" className="relative">
            <ShoppingCartIcon className="h-6 w-6 text-black hover:text-gray-700 transition-all duration-300" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
              3
            </span>
          </NavLink>

          {/* Login Button */}
          <NavLink
            to="/login"
            className="btn btn-primary btn-sm bg-black border-black text-white hover:bg-gray-800"
          >
            Login
          </NavLink>

          {/* Mobile Menu */}
          <div className="md:hidden dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="black"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-lg w-52 border border-gray-200"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block px-4 py-2 text-black hover:bg-gray-100 rounded-lg transition-all duration-300 ${
                      isActive ? "font-bold bg-gray-200" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    `block px-4 py-2 text-black hover:bg-gray-100 rounded-lg transition-all duration-300 ${
                      isActive ? "font-bold bg-gray-200" : ""
                    }`
                  }
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block px-4 py-2 text-black hover:bg-gray-100 rounded-lg transition-all duration-300 ${
                      isActive ? "font-bold bg-gray-200" : ""
                    }`
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block px-4 py-2 text-black hover:bg-gray-100 rounded-lg transition-all duration-300 ${
                      isActive ? "font-bold bg-gray-200" : ""
                    }`
                  }
                >
                  About us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-6 pb-3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 rounded-full border border-black focus:ring-2 focus:ring-black focus:outline-none shadow-md transition-all duration-300"
          />
          <button className="absolute right-3 top-2 text-black hover:text-gray-700 transition-all duration-300">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
