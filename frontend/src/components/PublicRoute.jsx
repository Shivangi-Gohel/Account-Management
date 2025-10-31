import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <Navigate to="/profile" replace /> : <Outlet />;
};

export default PublicRoute;
