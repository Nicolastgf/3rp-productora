import { useState} from "react"
import "../../styles/gastos/Gastos.css"

const GastosBody = ({ onBuscar, mostrarTabla }) => {


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
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>

            <button className="btn-search" onClick={handleBuscar}>
              BUSCAR
            </button>
          </div>
        </div>
      )}

      {mostrarTabla && (
        <div className="tabla-container">
          <table className="tabla-gastos">
            <thead>
              <tr>
                <th>Concepto</th>
                <th>{mes} {anio}</th>
                <th>Porcentaje</th>
                <th>Estimado</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              <tr className="fila-tabla">
                <td>Costo Financiero</td>
                <td>0,00</td>
                <td>0,00</td>
                <td>2.074.000,00</td>
                <td>
                  <div className="td-acciones">
                    <button className="btn-edit">
                      <span className="material-symbols-outlined">
                        edit
                      </span> 
                      EDITAR
                    </button>
                    <button className="btn-delete">
                      <span className="material-symbols-outlined">
                        delete
                      </span>
                      ELIMINAR
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="fila-tabla">
                <td>Gasto Operativo</td>
                <td>90.000,00</td>
                <td>5,46</td>
                <td>644.200,00</td>
                <td>
                  <div className="td-acciones">
                    <button className="btn-edit">
                      <span className="material-symbols-outlined">
                        edit
                      </span> 
                      EDITAR
                    </button>
                    <button className="btn-delete">
                      <span className="material-symbols-outlined">
                        delete
                      </span>
                      ELIMINAR
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <hr className="linea-separadora"/>

            <div className="tabla-container">
                <table className="tabla-gastos">

                    <tbody>
                    <tr className="fila-tabla">
                        <td>Gastos totales</td>
                        <td>90.000,00</td>
                        <td>100,00</td>
                        <td>2.718.200,00</td>
                    </tr>

                    <tr className="fila-tabla">
                        <td>Ganancia bruta</td>
                        <td>0,00</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="fila-tabla">
                        <td>Ganancia Neta</td>
                        <td>90.000,00</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="fila-tabla">
                        <td>Acumulado desde Abril</td>
                        <td>95,250,220.62</td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                 </table>
            </div>
        </div>
      )}


    </>
  )
}

export default GastosBody