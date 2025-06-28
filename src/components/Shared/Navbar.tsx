import { NavLink, useLocation } from "react-router-dom";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useGetUserProfileQuery } from "../../features/user/userApi";
import { useGetSearchProductsQuery } from "../../features/products/productsApi"; // Adjust path if needed
import UserProfile from "../Profile/UserProfile";
import { BarLoader } from "react-spinners";
import useCheckRoles from "../../hooks/auth/useCheckRoles";
import { useGetWishlistQuery } from "../../features/wishlist/wishlistApi";
import { useGetCartQuery } from "../../features/cart/cartApi";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  const { data: userData } = useGetUserProfileQuery();
  const {
    data: searchData,
    isFetching,
  } = useGetSearchProductsQuery(
    {
      keyword: searchQuery,
      page: 1,
      limit: 4,
    },
    {
      skip: searchQuery.trim() === "",
    }
  );

  useEffect(() => {
    if (searchQuery.trim() !== "" ) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchQuery, searchData]);
  const {isAdmin,isVendor,isSuperAdmin} = useCheckRoles();
  const {data:wishlistData, isLoading: isWishlistLoading} = useGetWishlistQuery();
  const {data: cartData, isLoading: isCartLoading } = useGetCartQuery();
  console.log("Wishlist Data:", wishlistData?.items.length); 
  const isActive = (path: string) => {
    return location.pathname === path
      ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-black after:rounded-full"
      : "";
  };

  return (
    <nav className="bg-white shadow-md relative">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-extrabold text-black tracking-wide">
          MyStore
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 justify-center mx-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full px-4 py-2 rounded-full border border-black focus:ring-2 focus:ring-black focus:outline-none shadow-md transition-all duration-300"
            />
            <button className="absolute right-3 top-2 text-black hover:text-gray-700 transition-all duration-300">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        {/* Search Dropdown */}
        {showDropdown && (
          <div className="absolute top-[7rem] lg:top-[4rem] lg:w-[32rem] lg:left-[10rem] bg-white shadow-lg border border-gray-200 rounded-lg mt-2 z-50">
            {isFetching ? (
              <div className="p-4 text-center text-gray-500">
          <BarLoader className="mx-auto mb-2" />
          <p>Searching products...</p>
        </div>

            ) :  searchData?.data.length === 0 ? (
              <p className="p-4 font-semibold text-center text-red-500">
                  No products found for "{searchQuery}"
              </p>
            ) : (
              <>
                {searchData?.data?.map((product) => (
                  <NavLink
                    key={product._id}
                    to={`/shop/${product._id}`}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 transition-all duration-300"
                    onClick={() => setShowDropdown(false)}
                  >
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-10 h-10 object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {product.name}
                      </p>
                      <p
                        className={`text-xs ${
                          product.stock > 0 ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {product.price}৳
                      </p>
                    </div>
                  </NavLink>
                ))}

                <div className="border-t border-gray-200">
                  <NavLink
                    to={`/search?query=${searchQuery}`}
                    className="block text-center py-2 text-white bg-gray-800 rounded-b-lg hover:bg-gray-700 transition-all duration-300 font-semibold"
                    onClick={() => setShowDropdown(false)}
                  >
                    See All Results
                  </NavLink>
                </div>
              </>
            )}
          </div>
        )}


        {/* Navigation Links */}
        <div className="flex items-center gap-x-6 lg:gap-x-10">
          <div className="hidden md:flex gap-x-6 lg:gap-x-8">
            <NavLink
              to="/"
              className={`relative font-semibold text-black hover:text-gray-700 transition-all duration-300 ${isActive("/")}`}
            >
              <i className="fa-solid fa-house mr-1"></i> Home
            </NavLink>
            <NavLink
              to="/shop"
              className={`relative font-semibold text-black hover:text-gray-700 transition-all duration-300 ${isActive("/shop")}`}
            >
              <i className="fa-solid fa-bag-shopping mr-1"></i> Shop
            </NavLink>
            <NavLink
              to="/contact"
              className={`relative font-semibold text-black hover:text-gray-700 transition-all duration-300 ${isActive("/contact")}`}
            >
              <i className="fa-solid fa-phone mr-1"></i> Contact
            </NavLink>
            <NavLink
              to="/about"
              className={`relative font-semibold text-black hover:text-gray-700 transition-all duration-300 ${isActive("/about")}`}
            >
              <i className="fa-solid fa-circle-info mr-1"></i> About us
            </NavLink>
          </div>

    {/* Cart Icon */}
    {!(isAdmin || isVendor || isSuperAdmin) && (
      <NavLink to="/cart" className="relative ml-2 md:ml-0">
        <ShoppingCartIcon className="h-6 w-6 text-black hover:text-gray-700 transition-all duration-300" />
        {/* <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
          3
        </span> */}
         {!isCartLoading && (cartData?.items?.length ?? 0) > 0 && (
            <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full px-2">
              {(cartData?.items?.length ?? 0)}
            </span>
          )}
      </NavLink>
    )}

      {/* Wishlist Icon */}
      {!(isAdmin || isVendor || isSuperAdmin) && (
        <NavLink to="/wishlist" className="relative">
          <HeartIcon className="h-6 w-6 text-black hover:text-gray-700 transition-all duration-300" />
          {!isWishlistLoading && (wishlistData?.items?.length ?? 0) > 0 && (
            <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full px-2">
              {(wishlistData?.items?.length ?? 0)}
            </span>
          )}

        </NavLink>
      )}
 

          {/* Profile or Login */}
          {userData ? (
            <UserProfile />
          ) : (
            <NavLink
              to="/login"
              className="btn btn-primary btn-sm bg-black border-black text-white hover:bg-gray-800"
            >
              <i className="fa-solid fa-user"></i> Login
            </NavLink>
          )}

          {/* Mobile Dropdown */}
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
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/shop">Shop</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/about">About us</NavLink>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
