import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../features/auth/authSlice";

export default function useAuthCheck() {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);
 
    useEffect(() => {
        // You can only get the user from localStorage, as the access token is in an HTTP-only cookie
        const localStorageUser = localStorage.getItem("user");

        if (localStorageUser) {
            const user = JSON.parse(localStorageUser);
            
            if (user) {
                // Here we just store the user information, assuming the token is in an HTTP-only cookie
                dispatch(userLoggedIn({ user }));
            }
        }

        setAuthChecked(true);
    }, [dispatch]);

    return authChecked;
}
