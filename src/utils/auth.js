const KEYS = {
  TOKEN:     "token",
  ROLE:      "role",
  USER_NAME: "userName",
};

export const getToken    = ()  => localStorage.getItem(KEYS.TOKEN);
export const getRole     = ()  => localStorage.getItem(KEYS.ROLE);
export const getUserName = ()  => localStorage.getItem(KEYS.USER_NAME) || "Pengguna";

export const saveAuth = ({ token, role, nama }) => {
  localStorage.setItem(KEYS.TOKEN,     token);
  localStorage.setItem(KEYS.ROLE,      role);
  localStorage.setItem(KEYS.USER_NAME, nama);
};

export const clearAuth = () => {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
};

export const getRedirectPath = (role) =>
  role === "admin" ? "/admin" : "/dashboard";