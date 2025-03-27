const ShopBenefits = () => {
    return (
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Why Shop With Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            {/* 24/7 Support */}
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center">
                <i className="fas fa-headset text-4xl text-black"></i>
              </div>
              <h3 className="text-lg font-semibold mt-4">24/7 Support</h3>
              <p className="text-gray-500 mt-2">We are available anytime to assist you.</p>
            </div>
  
            {/* Fast & Free Shipping */}
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center">
                <i className="fas fa-shipping-fast text-4xl text-black"></i>
              </div>
              <h3 className="text-lg font-semibold mt-4">Fast & Free Shipping</h3>
              <p className="text-gray-500 mt-2">Get your orders delivered quickly.</p>
            </div>
  
            {/* Secure Payment */}
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center">
                <i className="fas fa-lock text-4xl text-black"></i>
              </div>
              <h3 className="text-lg font-semibold mt-4">Secure Payment</h3>
              <p className="text-gray-500 mt-2">Your transactions are safe with us.</p>
            </div>
  
            {/* Easy Returns */}
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center">
                <i className="fas fa-undo text-4xl text-black"></i>
              </div>
              <h3 className="text-lg font-semibold mt-4">Easy Returns</h3>
              <p className="text-gray-500 mt-2">Hassle-free returns within 30 days.</p>
            </div>
  
          </div>
        </div>
      </section>
    );
  };
  
  export default ShopBenefits;
  