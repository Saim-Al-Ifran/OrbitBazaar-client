// src/components/PrivateRoute.tsx
import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useGetUserProfileQuery } from "../features/user/userApi";


const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, error, isLoading } = useGetUserProfileQuery({});

  const userRole = data?.user?.role;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (error) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [error, navigate, location]);

  // Loading UI
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  // If authenticated but role doesn't match
  if (data && userRole !== "user") {
    return <Navigate to="/" replace />;
  }

  // Authorized user
  return <>{children}</>;
};

export default PrivateRoute;
