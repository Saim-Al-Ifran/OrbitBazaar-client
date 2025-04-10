import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login submitted", formData);
    // TODO: send formData to your backend or handle login logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <div className="relative flex items-center justify-center my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative bg-white px-2 text-sm text-gray-500">
              OR
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              // TODO: integrate Google login here
            }}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-black text-black rounded-lg font-medium bg-white hover:bg-gray-100 hover:border-[#F1EFEC] transition duration-300"
          >
            <FcGoogle className="text-lg" />
            <span className="font-medium">Continue with Google</span>
          </button>
          <Link to="/seller_login">
            <button
                type="button"
                className="w-full mt-3 bg-white border border-black text-black font-medium py-3 px-4 rounded-lg hover:bg-gray-100 hover:border-[#F1EFEC] transition duration-300"
            >

                <i className="fa-solid fa-user-tie mr-4"></i>
                Become a Seller
            </button>
          </Link>


        </div>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-black font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
