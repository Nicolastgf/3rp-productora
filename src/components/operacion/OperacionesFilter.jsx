import React from "react";
import "../../styles/operaciones/Operaciones.css";

const OperacionFilter = () => {
    return (
        <div className="operaciones-filter">
            <h4 style={{margin:"0 0 15px 0"}}>SELECCIONAR FECHA</h4>
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
                        <option value="2024">2018</option>
                        <option value="2025">2019</option>
                        <option value="2026">2020</option>
                        <option value="2027">2021</option>
                        <option value="2028">2022</option>
                        <option value="2029">2023</option>
                        <option value="2030">2024</option>
                        <option value="2031">2025</option>
                    </select>
                </div>

                <button className="btn-search">BUSCAR</button>
            </div>
        </div>
    );
};

export default OperacionFilter;
