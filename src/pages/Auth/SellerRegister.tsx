import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IRegistrationFormInput } from "../../types/types";
import { useVendorRegisterMutation } from "../../features/auth/authApi";
import toast from "react-hot-toast";
import { useGetUserProfileQuery } from "../../features/user/userApi";
import { useEffect } from "react";
 
 

const SellerRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegistrationFormInput>();
  
  const [vendorRegister, {isLoading, isSuccess }] = useVendorRegisterMutation();
  const { data: userData, refetch: refetchUser } = useGetUserProfileQuery();
  const role = userData?.data?.role;
  const navigate = useNavigate();
  // Redirect based on user role
  useEffect(() => {
      if (isSuccess && role) {
        if (role === "vendor") navigate("/dashboard/vendor");
      }
  }, [role, navigate, isSuccess]);

  //handle form submission
  const onSubmit = async(data: IRegistrationFormInput) => {
    try {
    await  vendorRegister({
        name: data.username,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber, 
      }).unwrap();
      await refetchUser();
      toast.success("Registration successful!");
    }
    catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-lg bg-white border border-gray-200 shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Seller Registration</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("username", { required: "Full Name is required" })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.username
                  ? "border-red-500 focus:ring-red-500 placeholder-red-400"
                  : "border-gray-300 focus:ring-black bg-gray-100 text-gray-800"
              }`}
            />
            {errors.username&& (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>
          {/* Phone number */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              placeholder="+1234567890"
              {...register("phoneNumber", { required: "Full Name is required" })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.phoneNumber
                  ? "border-red-500 focus:ring-red-500 placeholder-red-400"
                  : "border-gray-300 focus:ring-black bg-gray-100 text-gray-800"
              }`}
            />
            {errors.phoneNumber&& (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500 placeholder-red-400"
                  : "border-gray-300 focus:ring-black bg-gray-100 text-gray-800"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500 placeholder-red-400"
                  : "border-gray-300 focus:ring-black bg-gray-100 text-gray-800"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500 placeholder-red-400"
                  : "border-gray-300 focus:ring-black bg-gray-100 text-gray-800"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-black text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SellerRegister;
