import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { ILoginFormInput } from "../../types/types";
import { useUserLoginMutation } from "../../features/auth/authApi";
import { useGetUserProfileQuery } from "../../features/user/userApi";
import toast from "react-hot-toast";
import { useEffect } from "react";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginFormInput>();

  const [login, { isLoading, isSuccess }] = useUserLoginMutation();
  const navigate = useNavigate();
  const { data: userData, refetch: refetchUser } = useGetUserProfileQuery({});
  const role = userData?.data?.role;
  // Redirect based on user role
  useEffect(() => {
 
    if (isSuccess && role) {
      if (role === "user") navigate("/");
      else if (role === "vendor") navigate("/dashboard/vendor");
    }
  }, [role, navigate, isSuccess]);

  const onSubmit = async (data: ILoginFormInput) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      await refetchUser();
      toast.success("Login success");
      reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500 placeholder-red-400"
                  : "border-gray-300 focus:ring-black bg-gray-100 text-gray-800"
              }`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500 placeholder-red-400"
                  : "border-gray-300 focus:ring-black bg-gray-100 text-gray-800"
              }`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-black text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4">
          <div className="relative flex items-center justify-center my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative bg-white px-2 text-sm text-gray-500">OR</div>
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
