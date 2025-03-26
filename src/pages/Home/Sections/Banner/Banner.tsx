import { useState, useEffect } from "react";

const banners = [
  {
    id: 1,
    image: "https://img.freepik.com/free-photo/amazed-young-woman-shopaholic-holding-colorful-shopping-bags-look-amused-shop-buying-thi_1258-125439.jpg?t=st=1742970165~exp=1742973765~hmac=ccb781f983cb43ba4f2478a2e3dc4ab3e0069e669184e9084c76a04063e90819&w=1380",
    title: "Big Summer Sale",
    description: "Get up to 50% off on all products!",
  },
  {
    id: 2,
    image: "https://img.freepik.com/free-photo/excited-girl-scream-joy-making-fist-pump-holding-shopping-bag-rejoicing-standing-dress-ove_1258-121722.jpg?t=st=1742968756~exp=1742972356~hmac=669574781befcc92c1c958a1de53c7203c31679b9f9d77a4cdaedf2aafa7512d&w=1380",
    title: "New Arrivals!",
    description: "Discover the latest trends in fashion.",
  },
  {
    id: 3,
    image: "https://img.freepik.com/free-photo/concept-shopping-holidays-lifestyle-happy-bearded-guy-holding-paper-bag-from-store-showin_1258-155091.jpg?t=st=1742970208~exp=1742973808~hmac=fbd11474eaf50d1293a3e1a6c11c7c1d32ed523f81803a0d3c6d5c9f50eb8ebe&w=1380",
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
    <div className="relative w-full h-screen">
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
              <button className="btn btn-primary btn-sm lg:btn-lg bg-black border-black text-white hover:bg-gray-800 mt-4">Shop Now</button>
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
