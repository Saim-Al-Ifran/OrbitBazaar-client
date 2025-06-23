import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../../features/products/productsApi";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";
import Pagination from "../../components/Pagination/Pagination";
import SkeletonCard from "../../components/SkeletonLoader/SkeletonCard";
import BreadcrumbSkeleton from "../../components/SkeletonLoader/BreadcrumbSkeleton";
import useCheckRoles from "../../hooks/auth/useCheckRoles";
import { Tooltip } from "@material-tailwind/react";
 

interface CategoryChangeHandler {
  (category: string): void;
}

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [view, setView] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterCategoryLoading, setFilterCategoryLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("createdAt:asc");
  const [sortingLoading, setSortingLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [page, setPage] = useState(1);
  const [priceFilterLoading, setPriceFilterLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const limit = 6;

  const { data: productsData, isLoading: isProductLoading, isError: isProductError } = useGetAllProductsQuery({
    page,
    limit,
    category: selectedCategory === "All" ? undefined : selectedCategory,
    sort: sortOrder,
    minPrice,
    maxPrice,
  });
  const { data: categories } = useGetCategoriesQuery();
  const {isAdmin,isVendor,isSuperAdmin} = useCheckRoles();
  // ✅ Read URL params on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = Number(params.get("page")) || 1;
    const categoryParam = params.get("category") || "All";
    const minParam = Number(params.get("minPrice")) || 0;
    const maxParam = Number(params.get("maxPrice")) || 10000;
    const sortParam = params.get("sort") || "createdAt:asc";

    setPage(pageParam);
    setSelectedCategory(categoryParam);
    setPriceRange({ min: minParam, max: maxParam });
    setSortOrder(sortParam);
  }, []);

  // ✅ Sync filter values to URL
  useEffect(() => {
    const params = new URLSearchParams();

    params.set("page", String(page));
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    if (minPrice !== 0) params.set("minPrice", String(minPrice));
    if (maxPrice !== 10000) params.set("maxPrice", String(maxPrice));
    if (sortOrder !== "createdAt:asc") params.set("sort", sortOrder);

    navigate(`?${params.toString()}`, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, selectedCategory, minPrice, maxPrice, sortOrder]);
 
  // ✅ Debounced price filtering
    useEffect(() => {
      const timeout = setTimeout(() => {
        if (priceRange.min !== minPrice || priceRange.max !== maxPrice) {
          setMinPrice(priceRange.min);
          setMaxPrice(priceRange.max);
          setPriceFilterLoading(true);
        }
      }, 500);

      return () => clearTimeout(timeout);
    }, [priceRange]);


  // ✅ Reset all loading states when data loads or fails
  useEffect(() => {
    setPaginationLoading(false);
    setSortingLoading(false);
    setFilterCategoryLoading(false);
    setPriceFilterLoading(false);
  }, [productsData, isProductError]);

  const handleCategoryChange: CategoryChangeHandler = (category) => {
    setSelectedCategory(category);
    setFilterCategoryLoading(true);
    setPage(1);
  };

  const isShopDataLoading =
    filterCategoryLoading || isProductLoading || paginationLoading || sortingLoading || priceFilterLoading; 

  const handleClearFilters = () => {
    setPriceFilterLoading(false);
    setSelectedCategory("All");
    setPriceRange({ min: 0, max: 10000 });
    setSortOrder("createdAt:asc");
    setPage(1);
 
  };

  return (
    <>
      <Helmet>
        <title>OrbitBazaar - Shop</title>
      </Helmet>

       
      {/* Breadcrumbs */}
      {isProductLoading ? (
          <BreadcrumbSkeleton />
      ):(
          <div className="bg-gray-100 py-3 rounded-md pl-[20px] lg:pl-[60px] mt-4 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="flex items-center gap-1 text-[16px] hover:text-blue-600">
                <i className="fas fa-home" />
                <span>Home</span>
              </Link>
              <span className="text-gray-400">/</span>
              <span className="flex items-center gap-1 text-[#47698F] font-medium text-[16px]">
                <i className="fa-solid fa-bag-shopping" />
                <span>Shop</span>
              </span>
            </div>
          </div>
      )}


      <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-base-100 p-4 shadow-lg rounded-lg">
          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Category</h3>
            {categories?.data ? (
              <ul className="space-y-1 text-gray-600">
                <li className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategory === "All"}
                    onChange={() => handleCategoryChange("All")}
                    className="checkbox checkbox-neutral"
                    disabled={isShopDataLoading}
                  />
                  <label>All</label>
                </li>
                {categories.data.map((category) => (
                  <li key={category._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategory === category.name}
                      onChange={() => handleCategoryChange(category.name)}
                      className="checkbox checkbox-neutral"
                      disabled={isShopDataLoading}
                    />
                    <label>{category.name}</label>
                  </li>
                ))}
              </ul>
            ) : (
              //  Skeleton Loader
              <ul className="space-y-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <li key={index} className="flex items-center gap-2 animate-pulse">
                    <div className="w-4 h-4 bg-gray-300 rounded" />
                    <div className="h-3 w-24 bg-gray-300 rounded" />
                  </li>
                ))}
              </ul>
            )}
          </div>


          {/* Price Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Price Range</h3>
            <label className="text-sm font-medium text-gray-600">Min: ${priceRange.min}</label>
            <input
              type="range"
              min={0}
              max={priceRange.max}
              value={priceRange.min}
              onChange={(e) => setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) }))}
              className="range range-sm"
              disabled={isShopDataLoading}
            />
            <label className="text-sm font-medium text-gray-600 mt-2">Max: ${priceRange.max}</label>
            <input
              type="range"
              min={priceRange.min}
              max={5000}
              value={priceRange.max}
              onChange={(e) => setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))}
              className="range range-sm"
              disabled={isShopDataLoading}
            />
            <p className="text-sm text-gray-500 mt-1">Showing products from ${minPrice} to ${maxPrice}</p>
          </div>

          {/* Clear Filters */}
          <button
            className="btn btn-error w-full"
            onClick={handleClearFilters}
            //disabled={isShopDataLoading }
          >
            Clear Filters
          </button>
        </div>

        {/* Product Listing */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
            <p className="text-gray-600">{productsData?.data?.length} total products.</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView("grid")}
                className={`btn btn-square ${view === "grid" ? "btn-neutral" : "btn-ghost"}`}
              >
                <i className="fas fa-th" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`btn btn-square ${view === "list" ? "btn-neutral" : "btn-ghost"}`}
              >
                <i className="fas fa-list" />
              </button>
              <select
                value={sortOrder}
                disabled={isShopDataLoading || productsData?.data?.length === 0}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setSortingLoading(true);
                  setPage(1);
                }}
                className="select select-bordered"
              >
                <option value="createdAt:desc">Newest First</option>
                <option value="createdAt:asc">Oldest First</option>
                <option value="price:asc">Price (Lowest)</option>
                <option value="price:desc">Price (Highest)</option>
              </select>
            </div>
          </div>

          {/* Products */}
          <div className={`grid ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}>
            {isShopDataLoading ? (
              Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
            ) : productsData?.data?.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 text-lg font-medium py-10">
                No products found matching your criteria.
              </div>
            ) : (
              productsData?.data?.map((product) => (
                <div
                  key={product._id}
                  className={`card bg-base-100 shadow-md ${view === "list" ? "flex flex-row items-center p-4" : ""}`}
                >
                  <figure className={`${view === "list" ? "w-1/3" : ""}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className={`${view === "list" ? "w-full h-32 object-cover" : "h-40 object-cover w-full"}`}
                    />
                  </figure>
                  <div className={`${view === "list" ? "w-2/3 pl-4" : "card-body"}`}>
                    <h3 className="card-title">{product.name}</h3>
                    <p className="text-gray-600">{product?.category?.name}</p>
                    <p className="text-gray-800 font-semibold">${product.price.toFixed(2)}</p>
                    <p className="text-gray-500 text-sm">{product.description}</p>
                    <div className="card-actions mt-2">
                      <div className="w-50">
                  <Tooltip
                    content={
                      isAdmin || isVendor || isSuperAdmin
                        ? "Only customers can add products to the cart"
                        : "Add to Cart"
                    }
                    placement="top"
                  >
                    <span>
                      <button
                        className={`btn w-full mb-2 ${
                          isAdmin || isVendor || isSuperAdmin
                            ? "bg-gray-300 cursor-not-allowed text-gray-600"
                            : "bg-gray-900 hover:bg-gray-700 text-white"
                        }`}
                        disabled={isAdmin || isVendor || isSuperAdmin}
                      >
                        <i className="fa-solid fa-cart-plus"></i> Add to Cart
                      </button>
                    </span>
                  </Tooltip>
                      </div>
                      <div className="w-20">
                        <Link to={`/shop/${product._id}`}>
                          <button className="btn bg-[#47698F] text-white border-[#35567b] flex-1">
                            <i className="fas fa-eye mr-1" /> View Product
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {!isProductLoading && (productsData?.data?.length ?? 0) > 0 && (
            <Pagination
              pagination={productsData?.pagination}
              isLoading={isProductLoading}
              paginationLoading={paginationLoading}
              setPage={setPage}
              setPaginationLoading={setPaginationLoading}
              label="Products"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
