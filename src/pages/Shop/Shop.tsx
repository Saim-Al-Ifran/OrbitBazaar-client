import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState<{ id: number; name: string; category: string; price: number; image: string; description: string; }[]>([]);
  const [view, setView] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "iPhone X",
        category: "Mobile",
        price: 60000,
        image:
          "https://i5.walmartimages.com/seo/Pre-Owned-Apple-iPhone-X-64GB-Factory-Unlocked-Smartphone-Refurbished-Good_9b5ec8b2-9665-463b-adc5-64829ba72da6.1b496e5a8fcee76fdad69bae12b54745.jpeg",
        description: "A high-end mobile phone with excellent performance.",
      },
      {
        id: 2,
        name: "Samsung S20",
        category: "Mobile",
        price: 50000,
        image: "https://mobilebuzzbd.com/wp-content/uploads/2023/07/Galaxy-S20-FE.jpg",
        description: "Powerful smartphone with a stunning display.",
      },
      {
        id: 3,
        name: "Dell Series",
        category: "Laptop",
        price: 6000,
        image: "https://mcsolution.com.bd/wp-content/uploads/2021/10/dell-inspiron-15-3000-price-in-bangladesh-1200x900.webp",
        description: "Reliable laptop for work and entertainment.",
      },
      {
        id: 4,
        name: "Nokia 420",
        category: "Mobile",
        price: 125.99,
        image: "https://i.gadgets360cdn.com/products/large/1551025118_635_Nokia_4.2_db.jpg",
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
    ]);
  }, []);

  const categories = ["All", "Mobile", "Laptop", "Computer", "Accessories", "Watch"];

  interface CategoryChangeHandler {
    (category: string): void;
  }

  const handleCategoryChange: CategoryChangeHandler = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filteredProducts = selectedCategory === "All" ? products : products.filter(product => product.category === selectedCategory);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
   return (
    <>
    <Helmet>
      <title>OrbitBazaar- Shop</title>
    </Helmet>
    {/* Breadcrumbs */}
      <div className="bg-gray-100 py-3 rounded-md pl-[20px] overflow-x-hidden lg:pl-[60px] mt-4 mb-4">
      <div className="flex items-center space-x-2 text-sm text-gray-600 m-auto">
        <Link to="/" className="flex items-center gap-1 text-[16px] hover:text-blue-600 transition-colors ">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
    
        <span className="text-gray-400 ">/</span>
        <span className="flex items-center gap-1 text-[#47698F] font-medium text-[16px]">
         <i className="fa-solid fa-bag-shopping"></i>
          <span>Shop</span>
        </span>
      </div>
      </div>


      <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      {/* Sidebar Filters */}
      <div className="w-full md:w-1/4 bg-base-100 p-4 shadow-lg rounded-lg">
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Category</h3>
          <ul className="space-y-1 text-gray-600">
            {categories.map((category) => (
              <li key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                  className="checkbox checkbox-neutral"
                />
                <label>{category}</label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Price</h3>
          <input type="range" className="range" min="0" max="60000" />
          <p>₹60,000.00</p>
        </div>

        <button className="btn btn-error w-full" onClick={() => setSelectedCategory("All")}>
          Clear Filters
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
          <p className="text-gray-600">{filteredProducts.length} total products.</p>

          <div className="flex items-center gap-2">
            <button onClick={() => setView("grid")} className={`btn btn-square ${view === "grid" ? "btn-neutral" : "btn-ghost"}`}>
              <i className="fas fa-th"></i>
            </button>
            <button onClick={() => setView("list")} className={`btn btn-square ${view === "list" ? "btn-neutral" : "btn-ghost"}`}>
              <i className="fas fa-list"></i>
            </button>
            <select className="select select-bordered">
              <option>Price (Lowest)</option>
              <option>Price (Highest)</option>
              <option>Name (A-Z)</option>
              <option>Name (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Product Grid / List */}
        <div className={`grid ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={`card bg-base-100 shadow-md ${view === "list" ? "flex flex-row items-center p-4" : ""}`}>
              <figure className={`${view === "list" ? "w-1/3" : ""}`}>
                <img src={product.image} alt={product.name} className={`${view === "list" ? "w-full h-32 object-cover" : "h-40 object-cover w-full"}`} />
              </figure>
              <div className={`${view === "list" ? "w-2/3 pl-4" : "card-body"}`}>
                <h3 className="card-title">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-gray-800 font-semibold">₹{product.price.toFixed(2)}</p>
                <p className="text-gray-500 text-sm">{product.description}</p>
                <div className="card-actions mt-2">
                  <div className="w-50">
                  <button className="btn bg-black text-white   border-black flex-1">
                    <i className="fas fa-cart-plus mr-1"></i> Add to Cart
                  </button>
                  </div>
                  <div className="w-20">
                  <Link to={`/shop/${product.id}`}>
                  <button className="btn bg-[#47698F] text-white border-[#35567b] flex-1">
                    <i className="fas fa-eye mr-1"></i> View Product
                  </button>
                  </Link>

                  </div>


                </div>
              </div>
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
            Page {currentPage} of {totalPages} ({filteredProducts.length} products)
          </p>
        </div>
      </div>
    </div>
    </>


    
  );
};

export default Shop;
