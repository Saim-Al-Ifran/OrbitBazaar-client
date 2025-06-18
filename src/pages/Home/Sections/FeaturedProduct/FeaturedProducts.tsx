import React from "react";
import { NavLink } from "react-router-dom";
import { useGetFeauturedProductsQuery } from "../../../../features/products/productsApi";
import SkeletonCard from "../../../../components/SkeletonLoader/SkeletonCard";
 

const FeaturedProducts: React.FC = () => {
  const { data: featuredProducts, isLoading } = useGetFeauturedProductsQuery({});

  const productsToShow = featuredProducts?.data?.slice(0, 4) || [];

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="antialiased tracking-normal font-sans leading-[1.3] text-inherit text-3xl font-bold flex items-center">
            <span className="inline-block w-1 h-8 mr-2 bg-[#495161]"></span>
            FEATURED PRODUCTS
          </h2>
          <NavLink to="/products/featured">
            <button className="btn btn-outline px-3 text-[12px] lg:px-6 lg:text-[12px] rounded-full border border-[#141414] text-[#020202] hover:bg-black hover:text-white transition duration-300">
              SEE ALL PRODUCTS
            </button>
          </NavLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)
          ) : productsToShow.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">No featured products available.</p>
          ) : (
            productsToShow.map((product) => (
              <div
                key={product._id}
                className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
              >
                {/* Product Image */}
                <div className="relative w-full h-56">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-t-xl" />
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
                      <i className="fa-solid fa-star"></i> {product.ratings.average}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">({product.ratings.count} reviews)</span>
                  </div>

                  <p className="text-gray-500 text-sm mt-1">Sold: {product.salesCount}+</p>

                  <div className="mt-4">
                    <button className="btn bg-gray-900 hover:bg-gray-700 text-white w-full mb-2">
                      <i className="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                    <button className="btn btn-outline w-full">
                      <i className="fa-solid fa-eye"></i> Quick View
                    </button>
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

export default FeaturedProducts;
