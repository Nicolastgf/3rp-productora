import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const PrivateRoute = ({ children }) => {
  const { usuario, token } = useAuthStore();

  if (!usuario || !token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
