import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { currentUser, isLoggedIn } = useAuth();

  // User is not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // User has wrong role
  if (role && currentUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  // User is allowed
  return children;
};

export default ProtectedRoute;
