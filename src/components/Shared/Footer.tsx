import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo & Description */}
        <div>
          <h2 className="text-xl font-bold text-white">OrbitBazaar</h2>
          <p className="mt-2 text-sm">
            Your one-stop destination for all your shopping needs. Quality products at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/shop" className="hover:text-white">Shop</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="/returns" className="hover:text-white">Returns & Refunds</a></li>
            <li><a href="/shipping" className="hover:text-white">Shipping Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              <i className="fa-brands fa-facebook text-xl"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fa-brands fa-twitter text-xl"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fa-brands fa-instagram text-xl"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fa-brands fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </div>
      <hr className="border-gray-700 my-6" />
      <p className="text-center text-sm">&copy; {new Date().getFullYear()} OrbitBazaar. All rights reserved.</p>
    </footer>
  );
};

export default Footer;