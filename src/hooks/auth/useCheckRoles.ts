
import { useGetUserProfileQuery } from "../../features/user/userApi";

const useUserRoles = () => {
  const { data:user, isLoading, isError} = useGetUserProfileQuery();

  const role = user?.data?.role;
 
  return {
    isSuperAdmin: role === "super-admin",
    isAdmin: role === "admin",
    isUser: role === "user",
    isVendor: role === "vendor",
    isLoading,
    isError,
  };
};

export default useUserRoles;
