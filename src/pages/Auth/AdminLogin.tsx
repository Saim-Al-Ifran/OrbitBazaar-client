import { useState } from "react";

const AdminLogin = () => {
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Add admin login logic here
    console.log("Admin Login:", adminData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={adminData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={adminData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#102E50] hover:bg-[#102e50e8] text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
          >
            Login 
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-7">
          © {new Date().getFullYear()} OrbitBazaar. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
