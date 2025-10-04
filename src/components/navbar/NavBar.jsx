import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <div className="navbar-container">
            {/* Logo */}
            <div className="navbar-logo">
                <span>3RP</span>
            </div>

            {/* Links */}
            <div className="navbar-links">
                <NavLink to="/" end>Tablero</NavLink>
                <NavLink to="/operacion">Operacion</NavLink>
                <NavLink to="/personas">Personas</NavLink>
                <NavLink to="/gastos">Gastos</NavLink>
                <NavLink to="/datos">Datos</NavLink>
                <NavLink to="/logout">Cerrar sesión</NavLink>
            </div>
        </div>
    );
}

export default Navbar;
