import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");
  // Si no hay usuario logueado, redirige al login
  if (!usuario || !token) {
    return <Navigate to="/" replace />;
  }

  // Si hay usuario y token , renderiza el contenido protegido
  return children;
};

export default PrivateRoute;
