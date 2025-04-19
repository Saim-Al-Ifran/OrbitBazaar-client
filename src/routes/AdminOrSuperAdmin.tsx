import { Navigate, useLocation } from "react-router-dom";
import useUserRoles from "../hooks/auth/useCheckRoles";
import React, { ReactNode } from "react";

interface AdminOrSuperAdminProps {
  children: ReactNode;
}

const AdminOrSuperAdmin: React.FC<AdminOrSuperAdminProps> = ({ children }) => {
  const { isSuperAdmin, isAdmin, isUser, isVendor, isLoading, isError } = useUserRoles();
  const location = useLocation();

  // Show loading spinner
  if (isLoading || (!isUser && !isAdmin && !isSuperAdmin && !isVendor && !isError)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  // Error or unknown role
  if (isError) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Redirect users and vendors to their dashboards
  if (isUser) return <Navigate to="/" replace />;
  if (isVendor) return <Navigate to="/dashboard/vendor" replace />;

  // Allow admins and super admins to access protected content
  if (isAdmin || isSuperAdmin) {
    return <>{children}</>;
  }

  // Fallback: redirect to admin login
  return <Navigate to="/admin/login" state={{ from: location }} replace />;
};

export default AdminOrSuperAdmin;

