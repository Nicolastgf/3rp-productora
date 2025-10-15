import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    // Si no hay usuario logueado, redirige al login
    if (!usuario) {
        return <Navigate to="/" replace />;
    }

    // Si hay usuario, renderiza el contenido protegido
    return children;
};

export default PrivateRoute;
