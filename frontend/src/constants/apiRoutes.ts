const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const API_URLS = {
  users: {
    register: `${BACKEND_URL}/users/register`,
    unregister: `${BACKEND_URL}/users/unregister`,
    login: `${BACKEND_URL}/users/login`,
    logout: `${BACKEND_URL}/users/logout`,
    session: `${BACKEND_URL}/users/session`,
  },
};
