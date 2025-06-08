import { useState } from "react";
import { Link } from "react-router-dom";
import ReviewSection from "./Sections/Review";
import { Helmet } from "react-helmet";

const productData = {
  id: 1,
  name: "Apple iPhone 14 Pro Max (256 GB) - Space Black",
  images: [
    "https://m.media-amazon.com/images/I/71ZDY57yTQL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/61cwywLZR-L._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/71r69YkmVwL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/61XO4bORHUL._SL1500_.jpg",
  ],
  price: 900,
  rating: 4.6,
  reviews: 1245,
  description:
    "iPhone 14 Pro Max. 6.7-inch Super Retina XDR display featuring Always-On and ProMotion. Dynamic Island, a magical new way to interact with iPhone. 48MP main camera for up to 4x greater resolution.",
  inStock: true,
};



const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(productData.images[0]);
  const [quantity, setQuantity] = useState(1);



  return (
    <>
    <Helmet>
      <title>{productData.name} - Product Details</title>
    </Helmet>
      {/* Breadcrumbs */}
      <div className="pl-5 lg:pl-16 mt-4 mb-4 bg-gray-100 py-3 rounded-md">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="flex items-center gap-1 text-[16px] hover:text-blue-600">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>
          <span className="text-gray-400">/</span>
          <Link to="/shop" className="flex items-center gap-1 hover:text-blue-600 font-medium text-[16px]">
            <i className="fa-solid fa-bag-shopping"></i>
            <span>Shop</span>
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#47698F] font-medium text-[16px]">{productData.name}</span>
        </div>
      </div>


      {/* Product Info */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Images */}
          <div className="w-full md:w-1/2">
            <div className="border rounded-lg overflow-hidden shadow-sm mb-4">
              <img src={selectedImage} alt="Selected" className="w-full h-[400px] object-contain" />
            </div>
            <div className="flex gap-3 overflow-x-auto">
              {productData.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  onClick={() => setSelectedImage(img)}
                  className={`h-20 w-20 object-cover rounded-md cursor-pointer border-2 ${
                    selectedImage === img ? "border-blue-500" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-3xl font-semibold">{productData.name}</h1>
            <div className="flex items-center gap-2 text-[#ff943d] text-[15px]">
              <i className="fas fa-star"></i>
              <span>
                {productData.rating} ({productData.reviews} ratings)
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-800">${productData.price.toLocaleString()}</div>
            <div className={`${productData.inStock ? "text-green-600" : "text-red-600"} font-medium`}>
              {productData.inStock ? "In Stock" : "Out of Stock"}
            </div>
            <p className="text-gray-700 leading-relaxed">{productData.description}</p>

            <div className="flex items-center gap-3">
              <span className="font-medium">Quantity:</span>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-16 border border-gray-300 rounded px-2 py-1"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button className="bg-white hover:bg-[#E2E2E2] hover:border-[#E2E2E2] border border-black text-black font-medium px-6 py-2 rounded-md transition">
                <i className="fa-solid fa-shield-heart mr-2"></i>
                Add to Wishlist
              </button>
              <button className="bg-black hover:bg-gray-800 text-white font-medium px-6 py-2 rounded-md transition">
                <i className="fa-solid fa-cart-shopping mr-2"></i>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

       {/* Reviews Section */}
       <ReviewSection />
    </>
  );
};

export default ProductDetails;
