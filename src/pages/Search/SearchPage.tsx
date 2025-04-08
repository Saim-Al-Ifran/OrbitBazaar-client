import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "iPhone X",
    category: "Mobile",
    price: 60000,
    image:
      "https://i5.walmartimages.com/seo/Pre-Owned-Apple-iPhone-X-64GB-Factory-Unlocked-Smartphone-Refurbished-Good_9b5ec8b2-9665-463b-adc5-64829ba72da6.1b496e5a8fcee76fdad69bae12b54745.jpeg",
    ratings: { average: 4.8, count: 85 },
    description: "A high-end mobile phone with excellent performance.",
  },
  {
    id: 2,
    name: "Samsung S20",
    category: "Mobile",
    price: 50000,
    image: "https://mobilebuzzbd.com/wp-content/uploads/2023/07/Galaxy-S20-FE.jpg",
    ratings: { average: 4.3, count: 60 },
    description: "Powerful smartphone with a stunning display.",
  },
  {
    id: 3,
    name: "Dell Series",
    category: "Laptop",
    price: 6000,
    image: "https://mcsolution.com.bd/wp-content/uploads/2021/10/dell-inspiron-15-3000-price-in-bangladesh-1200x900.webp",
    ratings: { average: 4.6, count: 45 },
    description: "Reliable laptop for work and entertainment.",
  },
  {
    id: 4,
    name: "Nokia 420",
    category: "Mobile",
    price: 125.99,
    image: "https://i.gadgets360cdn.com/products/large/1551025118_635_Nokia_4.2_db.jpg",
    ratings: { average: 4.7, count: 90 },
    description: "Classic Nokia phone with long battery life.",
  },
  {
    id: 5,
    name: "Mac PC",
    category: "Computer",
    price: 40000,
    image: "https://i.blogs.es/022fbb/new_2017_imac_two_side/1366_2000.jpg",
    description: "A powerful desktop for professionals.",
  },
  {
    id: 6,
    name: "MacBook Pro",
    category: "Laptop",
    price: 429.99,
    image: "https://techcrunch.com/wp-content/uploads/2024/11/CMC_8144.jpg?w=1024",
    description: "Premium laptop with high performance.",
  },
  {
    id: 6,
    name: "MacBook Pro",
    category: "Laptop",
    price: 429.99,
    image: "https://techcrunch.com/wp-content/uploads/2024/11/CMC_8144.jpg?w=1024",
    description: "Premium laptop with high performance.",
  },
];

const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentItems = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="bg-gray-100 py-3 rounded-md pl-[20px] overflow-x-hidden lg:pl-[60px] mt-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 m-auto">
            <Link to="/" className="flex items-center gap-1 text-[16px] hover:text-blue-600 transition-colors ">
            <i className="fas fa-home"></i>
            <span>Home</span>
            </Link>
        
            <span className="text-gray-400 ">/</span>
            <span className="flex items-center gap-1   font-medium text-[16px]">
            <i className="fa-solid fa-magnifying-glass"></i>
            <span>Search</span>
            </span>
            <span className="text-gray-400 ">/</span>
            <span className="flex items-center gap-1 text-[#47698F] font-medium text-[16px]">
 
                <span>Mobiles</span>
           </span>
        </div>
      </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
    
        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">Search Results "Mobiles"</h1>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {currentItems.map((item) => (
            <div
                key={item.id}
                className="border rounded-lg p-4 hover:shadow transition"
            >
                <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover mb-3 rounded"
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{item.category}</p>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <div className="flex  items-center mb-2">
                      <span className="text-[#FE9428] text-lg">
                      <i className="fa-solid fa-star"></i> {item.ratings?.average ?? "N/A"}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">({item.ratings?.count} reviews)</span>
                </div>
                <p className="text-black font-bold text-lg mb-3">₹{item.price}</p>
                
                <Link to={`/shop/${item.id}`}>
                    <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition">
                    View Product
                    </button>
                </Link>

            </div>
            ))}
        </div>

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
            Page {currentPage} of {totalPages} ({products.length} products)
          </p>
        </div>
        </div>
    </>

  );
};

export default SearchPage;
