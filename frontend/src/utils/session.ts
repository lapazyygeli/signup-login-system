import { AppDispatch } from "../redux/store";
import { logoutAsync } from "../redux/thunks/authThunks";

export const setupAutoLogout = (dispatch: AppDispatch, expiresAt: number) => {
  const remaining = expiresAt - Date.now();
  if (remaining > 0) {
    setTimeout(() => {
      dispatch(logoutAsync());
      localStorage.removeItem("sessionExpiresAt");
    }, remaining);
  }
};