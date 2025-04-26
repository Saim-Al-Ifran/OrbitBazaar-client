import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { HashLoader } from "react-spinners";

import { ILoginFormInput } from "../../types/types";
import {
  useFirebaseUserLoginMutation,
  useUserLoginMutation,
} from "../../features/auth/authApi";
import { useGetUserProfileQuery } from "../../features/user/userApi";
import app from "../../firebase/firebase.config";
import useUserRoles from "../../hooks/auth/useCheckRoles";

const LoginForm = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const {isUser,isVendor} = useUserRoles();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginFormInput>();

  const [login, { isLoading: isLoginLoading, isSuccess: isLoginSuccess }] =
    useUserLoginMutation();
  const [
    firebaseUserLogin,
    {
      isSuccess: isFirebaseLoginSuccess,
      error: firebaseLoginError,
    },
  ] = useFirebaseUserLoginMutation();

  const {
    data: userData,
    refetch: refetchUser,
  } = useGetUserProfileQuery();
  const role = userData?.data?.role;

  useEffect(() => {
    if (isUser) {
      navigate("/dashboard/user/home");
    } else if (isVendor) {
      navigate("/dashboard/vendor");
    }
  }, [isUser, isVendor, navigate]);

  // Role-based redirection after login
  useEffect(() => {
    if (isLoginSuccess && role) {
      if (role === "user") navigate("/");
      else if (role === "vendor") navigate("/dashboard/vendor");
    }
  }, [role, navigate, isLoginSuccess]);

  // Firebase login success/error handler
  useEffect(() => {
    if (firebaseLoginError) {
      const errorMessage =
        (firebaseLoginError as any)?.data?.message || "Login failed";
      toast.error(errorMessage);
    }

    if (isFirebaseLoginSuccess) {
      toast.success("Login successful");
      navigate("/");
      refetchUser();
    }
  }, [isFirebaseLoginSuccess, firebaseLoginError, navigate, refetchUser]);

  // Native login handler
  const onSubmit = async (formData: ILoginFormInput) => {
    try {
      await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      await refetchUser();
      toast.success("Login successful");
      reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  // Google login handler
  const handleGoogleLogin = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsLoadingGoogle(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      await firebaseUserLogin({ idToken }).unwrap();
    } catch (error) {
      console.error("Google login error", error);
      toast.error("Google login failed");
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
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
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
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
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoginLoading || isLoadingGoogle}
            className={`w-full bg-black text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ${
              isLoginLoading || isLoadingGoogle
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-900"
            }`}
          >
            {isLoginLoading || isLoadingGoogle ? (
              <HashLoader color="#ffffff" size={22} />
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* OR Divider */}
        <div className="mt-4">
          <div className="relative flex items-center justify-center my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative bg-white px-2 text-sm text-gray-500">
              OR
            </div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoginLoading || isLoadingGoogle}
            className={`w-full flex items-center justify-center gap-3 px-6 py-3 border border-black text-black rounded-lg font-medium bg-white hover:bg-gray-100 transition duration-300 ${
              isLoginLoading || isLoadingGoogle
                ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-100" 
                : ""
            }`}
          >
            <FcGoogle className="text-lg" />
            <span className="font-medium">Continue with Google</span>
          </button>

          {/* Seller Login */}
          <Link to="/seller_login">
            <button
              type="button"
              disabled={isLoginLoading || isLoadingGoogle}
              className={`w-full mt-3 bg-white border border-black text-black font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition duration-300 ${
                isLoginLoading || isLoadingGoogle
                  ? "opacity-50 cursor-not-allowed bg-gray-100"
                  : ""
              }`}
            >
              <i className="fa-solid fa-user-tie mr-4"></i>
              Become a Seller
            </button>
          </Link>
        </div>

        {/* Sign Up Redirect */}
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
