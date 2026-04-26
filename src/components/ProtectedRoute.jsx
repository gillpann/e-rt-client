import { Navigate } from "react-router-dom";
import { getToken, getRole, getRedirectPath } from "../utils/auth";

export default function ProtectedRoute({ children, allowedRole }) {
  const token = getToken();
  const role  = getRole();

  if (!token) return <Navigate to="/login" replace />;

  if (allowedRole && role !== allowedRole) {
    return <Navigate to={getRedirectPath(role)} replace />;
  }

  return children;
}