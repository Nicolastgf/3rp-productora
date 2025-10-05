import { useState } from "react"
import "../../styles/operaciones/Operaciones.css"

const GastosBody = ({  onBuscar, mostrarTabla }) => {


    const [mes, setMes] = useState("");
    const [anio, setAnio] = useState("");


    const handleBuscar = () => {
        if (mes && anio) {
            onBuscar();
            console.log(`Buscando datos de ${mes} del año ${anio}`);
        } else {
            alert("Por favor seleccioná un mes y un año.");
        }
    };

    return (
        <>
            {!mostrarTabla && (
                <div className="gastos-filter" style={{ marginTop: "20px" }}>
                    <h4 style={{ margin: "0 0 15px 0" }}>SELECCIONAR FECHA</h4>
                    <div className="filter-row">
                        <div className="filter-group">
                            <label>Mes</label>
                            <select value={mes} onChange={(e) => setMes(e.target.value)}>
                                <option value="">Seleccionar mes</option>
                                <option value="Enero">Enero</option>
                                <option value="Febrero">Febrero</option>
                                <option value="Marzo">Marzo</option>
                                <option value="Abril">Abril</option>
                                <option value="Mayo">Mayo</option>
                                <option value="Junio">Junio</option>
                                <option value="Julio">Julio</option>
                                <option value="Agosto">Agosto</option>
                                <option value="Septiembre">Septiembre</option>
                                <option value="Octubre">Octubre</option>
                                <option value="Noviembre">Noviembre</option>
                                <option value="Diciembre">Diciembre</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Año</label>
                            <select value={anio} onChange={(e) => setAnio(e.target.value)}>
                                <option value="">Seleccionar año</option>
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

                        <button className="btn-search" onClick={handleBuscar}>
                            BUSCAR
                        </button>
                    </div>
                </div>
            )}


        </>
    )
}

export default GastosBody