import FeaturedVendors from "./Sections/FeaturedVendors";

 
const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-neutral">
          About Us
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Your one-stop multi-vendor marketplace connecting diverse sellers with quality buyers.
        </p>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p className="text-gray-700">
              Founded with a vision to revolutionize ecommerce, our platform unites a wide range of vendors under one roof. We offer an extensive selection of products to suit every taste and budget, empowering small businesses to thrive in the digital marketplace.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our Story"
              className="rounded-lg shadow"
            />
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div>
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our Mission"
              className="rounded-lg shadow"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-gray-700">
              Our mission is to empower independent vendors by providing a robust, user-friendly platform where they can showcase their products and connect with a broader audience. We are committed to quality, transparency, and building a thriving community for both sellers and buyers.
            </p>
          </div>
        </div>

        {/* Our Featured Vendors Section */}
        <FeaturedVendors/>
      </div>
    </div>
  );
};

export default AboutUs;
