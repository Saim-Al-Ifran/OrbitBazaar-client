import { useState } from "react";
import { Helmet } from "react-helmet";

  const dummyProducts = [
 
    {
      _id: "2",
      name: "Smart Watch Series 7",
      description: "Latest smartwatch with heart rate and fitness tracking.",
      category: "Wearables",
      vendorEmail: "vendor2@example.com",
      price: 199.99,
      stock: 8,
      image: "https://smartdeal.com.bd/public/uploads/all/6RJZarv2Y9iNyTR0dO55r3ZpL0PXda62IRRx2Mka.jpg",
      ratings: { average: 4.8, count: 85 },
      salesCount: 300,
      isFeatured: true,
    },
    {
      _id: "3",
      name: "Gaming Mouse RGB",
      description: "Ergonomic gaming mouse with adjustable DPI and RGB lighting.",
      category: "Accessories",
      vendorEmail: "vendor3@example.com",
      price: 49.99,
      stock: 15,
      image: "https://m.media-amazon.com/images/I/61wQNtMZHgL._AC_SL1500_.jpg",
      ratings: { average: 4.3, count: 60 },
      salesCount: 180,
      isFeatured: true,
    },
    {
      _id: "4",
      name: "4K Ultra HD Monitor",
      description: "27-inch UHD monitor with a 144Hz refresh rate.",
      category: "Monitors",
      vendorEmail: "vendor4@example.com",
      price: 299.99,
      stock: 5,
      image: "https://www.ryans.com/storage/products/small/dahua-dhi-lm27-u401a-27-inch-4k-uhd-display-hdmi-11711535834.webp",
      ratings: { average: 4.6, count: 45 },
      salesCount: 75,
      isFeatured: true,
    },
    {
      _id: "5",
      name: "Mechanical Gaming Keyboard",
      description: "RGB backlit mechanical keyboard with brown switches.",
      category: "Keyboards",
      vendorEmail: "vendor5@example.com",
      price: 79.99,
      stock: 20,
      image: "https://m.media-amazon.com/images/I/71umGn6O2lL._AC_SL1500_.jpg",
      ratings: { average: 4.7, count: 90 },
      salesCount: 150,
      isFeatured: true,
    },
  ];
const FeaturedProducts = () => {
  const [sortOrder, setSortOrder] = useState("createdAt:desc");
  const [products] = useState(dummyProducts);
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
                      onChange={(e) => {
                        setSortOrder(e.target.value);
          
                      }}
                      className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="createdAt:desc">Newest First</option>
                        <option value="createdAt:asc">Oldest First</option>
                        <option value="price:asc">Price: Low to High</option>
                        <option value="price:desc">Price: High to Low</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
              </div>
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">No featured products available.</p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
              >
                {/* Product Image */}
                <div className="relative w-full h-56">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-t-xl" />
                </div>

                {/* Product Details */}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{product.name}</h3>

                  {/* Price & Stock */}
                  <div className="flex justify-center items-center gap-2 mt-2">
                    <span className="text-gray-900 text-xl font-bold">${product.price}</span>
                    {product.stock > 0 ? (
                      <span className="text-green-500 text-sm">In Stock</span>
                    ) : (
                      <span className="text-red-500 text-sm">Out of Stock</span>
                    )}
                  </div>

                  {/* Ratings */}
                  <div className="flex justify-center items-center mt-2">
                    <span className="text-[#FE9428] text-lg">
                    <i className="fa-solid fa-star"></i> {product.ratings.average}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">({product.ratings.count} reviews)</span>
                  </div>

                  {/* Sales Count */}
                  <p className="text-gray-500 text-sm mt-1">Sold: {product.salesCount}+</p>

                  {/* Action Buttons - Always Visible */}
                  <div className="mt-4">
                    <button className="btn bg-gray-900 hover:bg-gray-700 text-white w-full mb-2">
                    <i className="fa-solid fa-cart-plus"></i> Add to Cart
                      </button>
                    <button className="btn btn-outline w-full">
                    <i className="fa-solid fa-eye"></i> Quick View</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <div className="flex items-center gap-2">
            <button className="btn btn-sm btn-outline" disabled>
              Prev
            </button>
            <button className="btn btn-sm btn-neutral">1</button>
            <button className="btn btn-sm btn-outline">2</button>
            <button className="btn btn-sm btn-outline">3</button>
            <button className="btn btn-sm btn-outline">Next</button>
          </div>
          <p className="text-sm text-gray-500 hidden md:block">
            Page 1 of 3 (24 Featured Products)
          </p>
        </div>

      </div>
    </>

  );
};

export default FeaturedProducts;
