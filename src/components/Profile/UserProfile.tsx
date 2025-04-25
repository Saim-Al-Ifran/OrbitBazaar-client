import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import avatar from '../../assets/userAvatar.png'
import { useGetUserProfileQuery } from '../../features/user/userApi';
import { useLogoutMutation } from '../../features/auth/authApi';
import { apiSlice } from '../../features/api/apiSlice';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {data:userData} = useGetUserProfileQuery(); // Fetch user profile data
  const [logout, { isSuccess: logoutSuccess }] = useLogoutMutation();

  const { name, image, email } = userData?.data || {};

  const handleLogout = async () => {
     try {
      await logout({}).unwrap();
      dispatch(apiSlice.util.resetApiState());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (logoutSuccess) {
      toast.success("Logout successful!");
      navigate("/");
    }
  }, [logoutSuccess, navigate]);

  return (
    <> 
      { !userData ? (
        <h1>No user data available</h1>
      ) : (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full border border-gray-300">
              <img
                alt="User avatar"
                src={image || avatar}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-60 p-2 shadow border border-gray-200"
          >
            <li className="p-2 border-b border-gray-100 mb-1">
              <strong className="text-sm">{name}</strong>
              {email && (
                <span className="text-xs text-gray-500 truncate">{email}</span>
              )}
            </li>
            <li>
              <Link
                to="/dashboard/user/home"
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition text-sm font-medium"
              >
              <i className="fa-solid fa-chart-line"></i>
                Go to dashboard
              </Link>
            </li>
 
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500  hover:bg-red-600 text-white px-4 py-2 rounded mt-1 w-full transition"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
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
