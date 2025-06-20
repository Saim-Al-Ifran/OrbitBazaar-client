import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
 
import { useGetSearchProductsQuery } from "../../features/products/productsApi";
import SkeletonCard from "../../components/SkeletonLoader/SkeletonCard";
import Pagination from "../../components/Pagination/Pagination";
 
 
 
const SearchPage = () => {
   const navigate = useNavigate();
 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("query") || "";
  const [sortOption, setSortOption] = useState("createdAt:desc");
  const [page, setPage] = useState(1);
  const limit = 6;
  const [sortingLoading, setSortingLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);

  const { data, isFetching} = useGetSearchProductsQuery({
    keyword,
    page: page,
    limit,
    sort: sortOption,
  });
  const products = data?.data || [];

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));  
    navigate(`?${params.toString()}`, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page,sortOption]);

  useEffect(() => {
    setPaginationLoading(false);
    setSortingLoading(false);
  }, [products]);

  // Reset to page 1 if keyword changes
  useEffect(() => {
    setPage(1);
  }, [keyword]);

  return (
    <>
      <div className="bg-gray-100 py-3 rounded-md pl-5 lg:pl-[60px] mt-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="flex items-center gap-1 text-[16px] hover:text-blue-600">
            <i className="fas fa-home"></i> <span>Home</span>
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-[16px] flex items-center gap-1">
            <i className="fa-solid fa-magnifying-glass"></i> <span>Search</span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">
            {keyword ? `Search Results for "${keyword}"` : "All Products"}
          </h1>

          {/* Sort dropdown only */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <i className="fa-solid fa-arrow-down-wide-short text-gray-600" />
              Sort by:
            </label>
            <select
              id="sort"
              disabled={sortingLoading || isFetching}
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
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

        {/* Results */}
        {isFetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
          </div>
        )  : products.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            No products found for "{keyword}"
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {products.map((item) => (
              <div key={item._id} className="border rounded-lg p-4 hover:shadow transition">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-40 object-cover mb-3 rounded"
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{item.category?.name}</p>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <div className="flex items-center mb-2">
                  <span className="text-[#FE9428] text-lg">
                    <i className="fa-solid fa-star"></i>{" "}
                    {item.ratings?.average ?? "N/A"}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    ({item.ratings?.count ?? 0} reviews)
                  </span>
                </div>
                <p className="text-black font-bold text-lg mb-3">${item.price}</p>
                <Link to={`/shop/${item._id}`}>
                  <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition">
                    View Product
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}

  
          {/* Pagination */}
          {!isFetching && (products?.length ?? 0) > 0 && (
            <Pagination
              pagination={data?.pagination}
              isLoading={isFetching}
              paginationLoading={paginationLoading}
              setPage={setPage}
              setPaginationLoading={setPaginationLoading}
              label="Products"
            />
          )}
      </div>
    </>
  );
};

export default SearchPage;
