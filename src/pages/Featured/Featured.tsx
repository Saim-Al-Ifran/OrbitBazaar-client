import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useGetFeauturedProductsQuery } from "../../features/products/productsApi";
import SkeletonCard from "../../components/SkeletonLoader/SkeletonCard";
import Pagination from "../../components/Pagination/Pagination";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "@material-tailwind/react";
import useCheckRoles from "../../hooks/auth/useCheckRoles";
import { useAddToCartMutation } from "../../features/cart/cartApi";
import toast from "react-hot-toast";

 
const FeaturedProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sortOrder, setSortOrder] = useState("createdAt:desc");
  const [page, setPage] = useState(1);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [sortingLoading, setSortingLoading] = useState(false);
  const limit = 8;
  const {data: featuredProducts,isLoading:isFeaturedLoading,isError:isFeaturedError} = useGetFeauturedProductsQuery({
    sort: sortOrder,
    page,
    limit,
  });
  const [loadingProductId, setLoadingProductId] =  useState<string | null>(null);
  const [addToCart] = useAddToCartMutation();
  const {isAdmin,isVendor,isSuperAdmin} = useCheckRoles();

   const isPrivilegedUser = isAdmin || isVendor || isSuperAdmin;
   useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", String(page));
    navigate(`?${params.toString()}`, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]); 
 
  useEffect(() => {
        setPaginationLoading(false);  
        setSortingLoading(false);
        if (isFeaturedError) {
          setPaginationLoading(false);
          setSortingLoading(false);
        }
    
  }, [ featuredProducts, isFeaturedError]);


    const handleAddToCart = async (productId: string, price: number) => {
      try {
        setLoadingProductId(productId);
  
        const res = await addToCart({ productId, price, quantity: 1 }).unwrap();
  
        if (res.message === "Added to cart") {
          toast.success("Product added to cart!");
        } else if (res.message === "Quantity updated") {
          toast.success("Quantity updated");
        } else {
          toast.success("Cart updated");
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to add product to cart");
      } finally {
        setLoadingProductId(null);
      }
    };

  return (
    <>
      <Helmet>
        <title>Featured Products</title>
      </Helmet>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
          <h1 className="text-[2rem] font-bold">Featured Products</h1>
          <div className="flex items-center gap-2">
              <div className="w-full md:w-72">
                  <i className="fa-solid fa-sort mr-2"></i>
                  <label htmlFor="sortOrder" className="text-sm font-medium text-gray-700">
                    Sort by
                  </label>
                  <div className="relative">
                    <select
                      id="sortOrder"
                      name="sortOrder"
                      value={sortOrder}
                      disabled={isFeaturedLoading || paginationLoading || sortingLoading}
                      onChange={(e) => {
                        setSortOrder(e.target.value);
                        setSortingLoading(true);
                        setPage(1); 
                      }}
                      className="select select-neutral"
                    >
                        <option value="createdAt:desc">Newest First</option>
                        <option value="createdAt:asc">Oldest First</option>
                        <option value="price:asc">Price: Low to High</option>
                        <option value="price:desc">Price: High to Low</option>
                    </select>
 
                  </div>
              </div>
          </div>
        </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {isFeaturedLoading || sortingLoading || paginationLoading ? (
          // Render 8 skeletons while loading
          Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
        ) : featuredProducts?.data.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No featured products available.</p>
        ) : (
          featuredProducts?.data.map((product) => (
            // Your original product card
            <div key={product._id} className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
              {/* Product Image */}
              <div className="relative w-full h-56">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Product Details */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="flex justify-center items-center gap-2 mt-2">
                  <span className="text-gray-900 text-xl font-bold">${product.price}</span>
                  {product.stock > 0 ? (
                    <span className="text-green-500 text-sm">In Stock</span>
                  ) : (
                    <span className="text-red-500 text-sm">Out of Stock</span>
                  )}
                </div>
                <div className="flex justify-center items-center mt-2">
                  <span className="text-[#FE9428] text-lg">
                    <i className="fa-solid fa-star"></i> {product.ratings.average.toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">({product.ratings.count} reviews)</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">Sold: {product.salesCount}+</p>
                <div className="mt-4">
                    <Tooltip
                      content={
                        isPrivilegedUser
                          ? "Only customers can add products to the cart"
                          : product.stock === 0
                          ? "Out of Stock"
                          : "Add to Cart"
                      }
                      placement="top"
                    >
                      <span>
                        <button
                          className={`btn w-full mb-2 ${
                            isPrivilegedUser || loadingProductId === product._id || product.stock === 0
                              ? "bg-gray-300 cursor-not-allowed text-gray-600"
                              : "bg-gray-900 hover:bg-gray-700 text-white"
                          }`}
                          disabled={
                            isPrivilegedUser ||
                            loadingProductId === product._id ||
                            product.stock === 0
                          }
                          onClick={() => handleAddToCart(product._id, product.price)}
                        >
                          {loadingProductId === product._id ? (
                            <>
                              <i className="fa-solid fa-spinner fa-spin mr-2"></i> Adding...
                            </>
                          ) : (
                            <>
                              <i className="fa-solid fa-cart-plus mr-2"></i> Add to Cart
                            </>
                          )}
                        </button>
                      </span>
                    </Tooltip>
                  <NavLink to={`/shop/${product._id}`}>
                      <button className="btn btn-outline w-full">
                        <i className="fa-solid fa-eye"></i> Quick View
                      </button>
                   </NavLink>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

 
      {!isFeaturedLoading&& (
        <Pagination
          pagination={featuredProducts?.pagination}
          isLoading={isFeaturedLoading}
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

export default FeaturedProducts;
