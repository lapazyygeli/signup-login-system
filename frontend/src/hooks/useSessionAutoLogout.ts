import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { checkSessionAsync, logoutAsync } from "../redux/thunks/userThunks";
import { setupAutoLogout } from "../utils/session";

const useSessionAutoLogout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const sessionExpiresAt = localStorage.getItem("sessionExpiresAt");

    if (sessionExpiresAt) {
      const expiresAt = parseInt(sessionExpiresAt, 10);
      const now = Date.now();

      // If already expired
      if (now >= expiresAt) {
        dispatch(logoutAsync());
        localStorage.removeItem("sessionExpiresAt");
      } else {
        // Set the remaining time
        setupAutoLogout(dispatch, expiresAt);
      }
    }

    //  Hits the backend to ask: "Hey, is there a
    //  valid cookie/session for this user?" and
    //  based on that changes isUserLoggedIn + isSessionChecked
    dispatch(checkSessionAsync());
  }, [dispatch]);
};

export default useSessionAutoLogout;
