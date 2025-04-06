import { useState } from "react";
import { Link } from "react-router-dom";

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

const mockReviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Amazing iPhone! Battery and camera are excellent.",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    comment: "Very sleek and smooth performance. A bit pricey though.",
    date: "4 days ago",
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 5,
    comment: "Loving the new Dynamic Island feature. Super useful!",
    date: "6 days ago",
  },
  {
    id: 4,
    name: "Emily Clark",
    rating: 4,
    comment: "Switched from Android. Best decision ever!",
    date: "1 week ago",
  },
  {
    id: 5,
    name: "Daniel Kim",
    rating: 5,
    comment: "Top-notch camera quality. Totally worth it.",
    date: "2 weeks ago",
  },
  {
    id: 6,
    name: "Laura Benson",
    rating: 4,
    comment: "Battery could be better, but everything else is 🔥.",
    date: "3 weeks ago",
  },
];

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(productData.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 3;
  const totalPages = Math.ceil(mockReviews.length / reviewsPerPage);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = mockReviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container pl-5 lg:pl-16 mt-4 mb-4">
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
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 pb-10 mt-10 border-t pt-6">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        <div className="space-y-6">
          {currentReviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#FF943D] text-sm">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${i < review.rating ? "" : "text-gray-300"}`}
                    ></i>
                  ))}
                  <span className="text-gray-600 text-sm ml-2">{review.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">{review.date}</span>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
              <div className="mt-2 text-sm text-gray-500">— {review.name}</div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <div className="flex items-center gap-2">
            <button
              className="btn btn-sm btn-outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`btn btn-sm ${currentPage === index + 1 ? "btn-neutral" : "btn-outline"}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="btn btn-sm btn-outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
          <p className="text-sm text-gray-500 hidden md:block">
            Page {currentPage} of {totalPages} ({mockReviews.length} reviews)
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
