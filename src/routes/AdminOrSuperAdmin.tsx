import { Navigate, useLocation } from "react-router-dom";
import useUserRoles from "../hooks/auth/useCheckRoles";
import React, { ReactNode } from "react";

interface AdminOrSuperAdminProps {
  children: ReactNode;
}

const AdminOrSuperAdmin: React.FC<AdminOrSuperAdminProps> = ({ children }) => {
  const { isSuperAdmin, isAdmin, isUser, isLoading, isError } = useUserRoles();
  const location = useLocation();
  if (isLoading || (!isUser && !isAdmin && !isSuperAdmin && !isError)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (isError || isUser) {
    return <Navigate to="/" replace />;
  }

  if (isAdmin || isSuperAdmin) {
    return <>{children}</>;
  }

  return <Navigate to="/admin/login" state={{ from: location }} replace />;
};

export default AdminOrSuperAdmin;
