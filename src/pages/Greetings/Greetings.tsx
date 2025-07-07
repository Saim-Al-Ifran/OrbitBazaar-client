// src/pages/Greetings.tsx

import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Greetings = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <i className="fas fa-check-circle text-green-600 text-5xl mb-4 animate-bounce" />
        </motion.div>

        <h1 className="text-3xl font-extrabold text-green-700 mb-2">
          Thank You for Your Purchase!
        </h1>
        <p className="text-gray-700 mb-6 text-base">
          Your order has been placed successfully. Ready to discover your next favorite item?
        </p>

        <div className="flex flex-col gap-3">
          <NavLink to="/dashboard/user/orders">
            <button className="bg-green-700 text-white font-medium px-4 py-2 rounded-md shadow hover:bg-green-800 transition-all duration-300">
              View My Orders
            </button>
          </NavLink>

          <NavLink to="/">
            <span className="text-green-700 hover:underline text-sm mt-1 transition duration-300">
              ← Continue Shopping
            </span>
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
};

export default Greetings;
