import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { userLoggedOut } from "../../features/auth/authSlice";

/**
 * Custom hook to automatically log out the user if the access token is expired.
 * 
 * When the app/component loads, this hook checks `localStorage` for the token's expiration time.
 * If the current time is beyond the stored expiration time, it:
 *   - removes the access and refresh tokens (from Cookies),
 *   - clears the user data from localStorage,
 *   - dispatches a logout action to update Redux state.
 * 
 * This is especially useful for handling session expiration on app refresh or re-opening the app after a long time.
 */
const useAutoLogout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Get the stored token expiry timestamp from localStorage
    const expiry = localStorage.getItem('tokenExpiry');

    // If token has expired, clear everything and log the user out
    if (expiry && Date.now() > Number(expiry)) {
      dispatch(userLoggedOut()); // update Redux state
      localStorage.removeItem('tokenExpiry'); // remove token expiry
      localStorage.removeItem('user'); // remove user info
      Cookies.remove('accessToken'); // remove access token
      Cookies.remove('refreshToken'); // remove refresh token
    }
  }, []);
};

export default useAutoLogout;
