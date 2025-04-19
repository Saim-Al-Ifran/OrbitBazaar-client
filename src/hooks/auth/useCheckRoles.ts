
import { useGetUserProfileQuery } from "../../features/user/userApi";

const useUserRoles = () => {
  const { data:user, isLoading, isError,error} = useGetUserProfileQuery({});

  const role = user?.data?.role;
  console.log(error);
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
