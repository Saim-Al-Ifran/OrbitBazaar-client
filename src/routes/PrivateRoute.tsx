// src/components/PrivateRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import useUserRoles from "../hooks/auth/useCheckRoles";
import React, { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isSuperAdmin, isAdmin, isUser, isVendor, isLoading, isError } = useUserRoles();
  const location = useLocation();

  // Show loading spinner while determining roles
  if (isLoading || (!isUser && !isAdmin && !isSuperAdmin && !isVendor && !isError)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  // Redirect to login if there's an error
  if (isError) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect admins/super admins to admin dashboard
  if (isAdmin || isSuperAdmin) return <Navigate to="/dashboard/admin" replace />;

  // Redirect vendors to vendor dashboard
  if (isVendor) return <Navigate to="/dashboard/vendor" replace />;

  // Only allow regular users
  if (isUser) {
    return <>{children}</>;
  }

  // Fallback: redirect to login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
