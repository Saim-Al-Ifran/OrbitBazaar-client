import { Navigate, useLocation } from "react-router-dom";
import useUserRoles from "../hooks/auth/useCheckRoles";
import React, { ReactNode } from "react";

interface VendorPrivateRouteProps {
  children: ReactNode;
}

const VendorPrivateRoute: React.FC<VendorPrivateRouteProps> = ({ children }) => {
  const { isVendor, isAdmin, isSuperAdmin, isUser, isLoading, isError } = useUserRoles();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  // ❌ Block all other roles and if token is invalid
  if (isError || isUser || isAdmin || isSuperAdmin) {
    return <Navigate to="/" replace />;
  }

  // ✅ Vendor is allowed
  if (isVendor) {
    return <>{children}</>;
  }

  // 🔒 Not authenticated or unknown case
  return <Navigate to="/vendor/login" state={{ from: location }} replace />;
};

export default VendorPrivateRoute;
