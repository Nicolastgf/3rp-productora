import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const [personasOpen, setPersonasOpen] = useState(false);
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
                <div 
                    className="dropdown-container"
                    onMouseEnter={() => setPersonasOpen(true)}
                    onMouseLeave={() => setPersonasOpen(false)}
                    >
                    <span className="dropdown-trigger">
                        Personas
                    </span>
                    
                    {personasOpen && (
                        <div className="dropdown-menu">
                            <NavLink to="/personas/productores" className="dropdown-item">
                                Productores
                            </NavLink>
                            <NavLink to="/personas/clientes" className="dropdown-item">
                                Clientes
                            </NavLink>
                            <NavLink to="/personas/transportes" className="dropdown-item">
                                Transportes
                            </NavLink>
                        </div>
                    )}
            </div>
                <NavLink to="/gastos">Gastos</NavLink>
                <NavLink to="/datos">Datos</NavLink>
                <NavLink to="/logout">Cerrar sesión</NavLink>
            </div>
        </div>
    );
}

export default Navbar;
