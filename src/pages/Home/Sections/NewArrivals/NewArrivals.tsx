
import React  from "react";
import { NavLink } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../../features/products/productsApi";
import SkeletonCard from "../../../../components/SkeletonLoader/SkeletonCard";
import useCheckRoles from "../../../../hooks/auth/useCheckRoles";
import { Tooltip } from "@material-tailwind/react";
import { useAddToCartMutation } from "../../../../features/cart/cartApi";
import toast from "react-hot-toast";
 
  const NewArrivals: React.FC = () => {
    //const [products] = useState(dummyProducts);
    const { data: products, isLoading } = useGetAllProductsQuery({});
    const [addToCart] = useAddToCartMutation();
  
    const [loadingProductId, setLoadingProductId] = React.useState<string | null>(null);
    const {isAdmin,isVendor,isSuperAdmin} = useCheckRoles();
    const productsToShow = products?.data?.slice(0, 4) || [];
    const isPrivilegedUser = isAdmin || isVendor || isSuperAdmin;
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
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-6">
                <h2 className="antialiased tracking-normal font-sans leading-[1.3] text-inherit text-3xl font-bold flex items-center">
                <span className="inline-block w-1 h-8 mr-2 bg-[#495161]"></span>
                NEW ARRIVALS</h2>
                <NavLink to="/shop">
                  <button className="btn btn-outline  px-3 text-[12px] lg:px-6 lg:text-[12px] rounded-full border border-[#141414] text-[#020202]   hover:bg-black hover:text-white transition duration-300">
                      VIEW ALL PRODUCTS
                  </button>
                </NavLink>

          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />)
            ) : productsToShow?.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">No featured products available.</p>
            ) : (
              productsToShow.map((product) => (
                <div
                  key={product._id}
                  className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="relative w-full h-56">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-t-xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>

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
                        <i className="fa-solid fa-star"></i> {product.ratings.average}
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

        </div>
      </section>
    );
  };
  
  export default NewArrivals;
