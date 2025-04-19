import { Navigate, useLocation } from "react-router-dom";
import useUserRoles from "../hooks/auth/useCheckRoles";
import React, { ReactNode } from "react";

interface VendorPrivateRouteProps {
  children: ReactNode;
}

const VendorRoute: React.FC<VendorPrivateRouteProps> = ({ children }) => {
  const { isVendor, isAdmin, isSuperAdmin, isUser, isLoading, isError } = useUserRoles();
  const location = useLocation();

  // ⏳ Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  // ✅ Vendor is allowed
  if (isVendor) {
    return <>{children}</>;
  }

  // ❌ Block other roles or error
  if (isUser || isAdmin || isSuperAdmin || isError) {
    return <Navigate to="/" replace />;
  }

  // 🔒 Not authenticated or unknown case
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default VendorRoute;
