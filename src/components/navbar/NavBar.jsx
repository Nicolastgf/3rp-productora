import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const [openDropdown, setOpenDropdown] = useState(false);

    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown);
    };

    const closeDropdown = () => {
        setOpenDropdown(false);
    };

    return (
        <div className="navbar-container">
            {/* Logo */}
            <div className="navbar-logo">
                <span>3RP</span>
            </div>

            {/* Links */}
            <div className="navbar-links">
                <NavLink to="/" end>
                    Tablero
                </NavLink>

                <NavLink to="/operacion">Operación</NavLink>

                {/* Dropdown controlado por click */}
                <div className="dropdown-container" onClick={toggleDropdown}>
                    <span className={`dropdown-trigger ${openDropdown ? "active" : ""}`}>
                        Personas ▾
                    </span>

                    {openDropdown && (
                        <div className="dropdown-menu" onMouseLeave={closeDropdown}>
                            <NavLink to="/personas/productor" className="dropdown-item" onClick={closeDropdown}>
                                Productores
                            </NavLink>

                            <NavLink to="/personas/cliente" className="dropdown-item" onClick={closeDropdown}>
                                Clientes
                            </NavLink>

                            <NavLink to="/personas/transportista" className="dropdown-item" onClick={closeDropdown}>
                                Transportistas
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
