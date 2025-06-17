import { useState, useEffect } from "react";
import img1 from  "../../../../assets/Banner_image/banner1.avif";
import img2 from  "../../../../assets/Banner_image/banner2.avif";
import img3 from  "../../../../assets/Banner_image/banner3.avif";
import { NavLink } from "react-router-dom";
const banners = [
  {
    id: 1,
    image: img1 ,
    title: "Big Summer Sale",
    description: "Get up to 50% off on all products!",
  },
  {
    id: 2,
    image: img2,
    title: "New Arrivals!",
    description: "Discover the latest trends in fashion.",
  },
  {
    id: 3,
    image: img3,
    title: "Limited Time Offer",
    description: "Hurry up! Limited stocks available.",
  },
];

const BannerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  const prevSlide = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);

  return (
    <div className="relative w-full lg:h-screen">
      {/* Banner Images */}
      <div className="relative w-full h-[250px] lg:h-full overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-4xl md:text-5xl font-bold">{banner.title}</h2>
              <p className="text-lg md:text-2xl mt-2">{banner.description}</p>
              <NavLink to="/shop">
                <button className="btn btn-primary btn-sm lg:btn-lg bg-black border-black text-white hover:bg-gray-800 mt-4">Shop Now</button>
              </NavLink>

            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button onClick={prevSlide} className="absolute top-[8rem] left-2 lg:left-6 lg:top-1/2 -translate-y-1/2 btn btn-circle bg-gray-800 text-white">
        ❮
      </button>
      <button onClick={nextSlide} className="absolute top-[8rem] right-2 lg:right-6 lg:top-1/2 -translate-y-1/2 btn btn-circle bg-gray-800 text-white">
        ❯
      </button>

 
    </div>
  );
};

export default BannerCarousel;
