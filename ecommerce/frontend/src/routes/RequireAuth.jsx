import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  

if (loading) return null;
if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;


  return children;
};

export default RequireAuth;
