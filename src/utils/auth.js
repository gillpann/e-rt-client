const KEYS = {
  TOKEN:     "token",
  ROLE:      "role",
  USER_NAME: "userName",
};

export const getToken    = ()  => localStorage.getItem(KEYS.TOKEN);
export const getRole     = ()  => localStorage.getItem(KEYS.ROLE);
export const getUserName = ()  => localStorage.getItem(KEYS.USER_NAME) || "Pengguna";

// utils/auth.js — tambahkan ini
export const saveAuth = ({ token, role, nama, user }) => {
  localStorage.setItem(KEYS.TOKEN,     token);
  localStorage.setItem(KEYS.ROLE,      role);
  localStorage.setItem(KEYS.USER_NAME, nama);
  localStorage.setItem("user", JSON.stringify(user)); 
};

export const clearAuth = () => {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
};

export const getRedirectPath = (role) =>
  role === "admin" ? "/admin" : "/dashboard";