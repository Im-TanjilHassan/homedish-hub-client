import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const RoleRoute = ({ allow, children }) => {
  const { dbUser, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <p>Loading...</p>;

  // not logged or db user not ready
  if (!dbUser?.role) {
    return <Navigate to="/login" replace />;
  }

  // role not allowed
  if (!allow.includes(dbUser.role)) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return children;
};

export default RoleRoute;
