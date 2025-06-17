
import React, { useState  } from "react";
import { NavLink } from "react-router-dom";
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
  
  const NewArrivals: React.FC = () => {
    const [products] = useState(dummyProducts);
  
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
        </div>
      </section>
    );
  };
  
  export default NewArrivals;
