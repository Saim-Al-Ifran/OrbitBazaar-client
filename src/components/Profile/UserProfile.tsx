import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 
 
import { useGetUserProfileQuery } from '../../features/user/userApi';
 
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLogoutMutation } from '../../features/auth/authApi';
import { apiSlice } from '../../features/api/apiSlice'; // Adjust the path as needed
import { useDispatch } from 'react-redux';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch =  useDispatch(); // Assuming you have a hook to get the dispatch function
  const { data: userData, isLoading,refetch } = useGetUserProfileQuery({});
 
  const {name,image} = userData?.data || {};
  const [logout, { isSuccess: logoutSuccess }] = useLogoutMutation();
 

  const handleLogout = async () => {
    try {
      await logout({});
      localStorage.removeItem("user");
      dispatch(apiSlice.util.resetApiState()); // Reset the API state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Redirect to login on successful logout
  useEffect(() => {
    if (logoutSuccess) {
      toast.success("Logout successful!");
      navigate("/");
    }
  }, [logoutSuccess, navigate]);
  
  console.log(userData?.profile?.firebaseUID);
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : !userData ? (
        <h1>No user data available</h1>
      ) : (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="User avatar" src={image}  referrerPolicy="no-referrer"/>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <strong>{name}</strong>
            </li>
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/my_bookings" className="justify-between">
                  My Bookings
              </Link>
            </li>
            {!userData?.profile?.firebaseUID && (
                <li>
                <Link to="/change-password" className="justify-between">
                    Change password
                </Link>
              </li>
            ) }
   
            <li>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default UserProfile;
 

