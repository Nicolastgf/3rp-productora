import React from "react";
import "../../styles/operaciones/Operaciones.css";

const OperacionFilter = () => {
    return (
        <div className="operaciones-filter">
            <h4>SELECCIONAR FECHA</h4>
            <div className="filter-row">
                <div className="filter-group">
                    <label>Mes</label>
                    <select>
                        <option>Seleccionar mes</option>
                        <option>Enero</option>
                        <option>Febrero</option>
                        <option>Marzo</option>
                        <option>Abril</option>
                        <option>Mayo</option>
                        <option>Junio</option>
                        <option>Julio</option>
                        <option>Agosto</option>
                        <option>Septiembre</option>
                        <option>Octubre</option>
                        <option>Noviembre</option>
                        <option>Diciembre</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Año</label>
                    <select>
                        <option>Seleccionar año</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2027</option>
                        <option>2028</option>
                        <option>2029</option>
                        <option>2030</option>
                        <option>2031</option>
                        <option>2032</option>
                    </select>
                </div>

                <button className="btn-search">BUSCAR</button>
            </div>
        </div>
    );
};

export default OperacionFilter;
