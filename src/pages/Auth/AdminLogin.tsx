import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { ILoginFormInput } from "../../types/types";
import { useAdminLoginMutation } from "../../features/auth/authApi";

const AdminLogin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginFormInput>();

  const [adminLogin, { isError, error, isSuccess, isLoading }] = useAdminLoginMutation<any>();

  const onSubmit = (data: ILoginFormInput) => {
    adminLogin({
      email: data.email,
      password: data.password,
    });
 
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login success");
      reset(); 
      navigate("/dashboard/admin");
    }
    console.log(isError);
    
    if (isError) {
      toast.error(error?.data?.message); 
    }
  }, [isSuccess, isError, error, navigate, reset]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              placeholder="admin@example.com"
              className={`w-full px-4 py-2 bg-gray-100 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } text-gray-800 rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-500" : "focus:ring-black"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-2 bg-gray-100 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } text-gray-800 rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "focus:ring-red-500" : "focus:ring-black"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#102E50] hover:bg-[#102e50e8] text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
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
