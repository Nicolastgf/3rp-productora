import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  traerOperacionesFiltradas,
} from "../../services/operacionesService";
import "../../styles/operaciones/Operaciones.css";

const OperacionesFilter = ({
  onVolver,
  onBuscar,
  mostrarTabla,
  modalAbierto,
}) => {
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");
  const [operaciones, setOperaciones] = useState([]);
  const [operacionesOriginales, setOperacionesOriginales] = useState([]);
  const [valorBusqueda, setValorBusqueda] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleBuscarFiltro = async () => {
  if (mes && anio) {
    setLoading(true);
    try {
      const data = await traerOperacionesFiltradas(mes, anio);
      setOperaciones(data);
      setOperacionesOriginales(data);
      onBuscar?.();

      // Redirigir a la página de detalle con parámetros
      navigate(`/operaciones/detalle?mes=${mes}&anio=${anio}`);
    } catch (err) {
      console.error("Error al traer operaciones:", err);
      alert("Error al cargar las operaciones");
    } finally {
      setLoading(false);
    }
  } else {
    alert("Por favor seleccioná un mes y un año.");
  }
};


  const handleBuscarInput = () => {
    if (valorBusqueda === "") {
      setOperaciones(operacionesOriginales);
    } else {
      const operacionesFiltradas = operacionesOriginales.filter((operacion) =>
        operacion.idOperacion.toString().includes(valorBusqueda) ||
        formatearFecha(operacion.FechaRegistro).includes(valorBusqueda) ||
        (operacion.compras?.[0]?.ProductoNombre || "").toLowerCase().includes(valorBusqueda.toLowerCase()) ||
        (operacion.compras?.[0]?.ProductorNombre || "").toLowerCase().includes(valorBusqueda.toLowerCase()) ||
        (operacion.compras?.[0]?.ProductorApellido || "").toLowerCase().includes(valorBusqueda.toLowerCase()) ||
        (operacion.ventas?.[0]?.ClienteNombre || "").toLowerCase().includes(valorBusqueda.toLowerCase()) ||
        (operacion.ventas?.[0]?.ClienteApellido || "").toLowerCase().includes(valorBusqueda.toLowerCase()) ||
        (operacion.transportes?.[0]?.TransportistaNombre || "").toLowerCase().includes(valorBusqueda.toLowerCase())
      );
      setOperaciones(operacionesFiltradas);
    }
  };

  const handleChange = (e) => {
    const nuevoValor = e.target.value;
    setValorBusqueda(nuevoValor);

    if (nuevoValor === "") {
      setOperaciones(operacionesOriginales);
    } else {
      const operacionesFiltradas = operacionesOriginales.filter((operacion) =>
        operacion.idOperacion.toString().includes(nuevoValor) ||
        formatearFecha(operacion.FechaRegistro).includes(nuevoValor) ||
        (operacion.compras?.[0]?.ProductoNombre || "").toLowerCase().includes(nuevoValor.toLowerCase()) ||
        (operacion.compras?.[0]?.ProductorNombre || "").toLowerCase().includes(nuevoValor.toLowerCase()) ||
        (operacion.ventas?.[0]?.ClienteNombre || "").toLowerCase().includes(nuevoValor.toLowerCase()) ||
        (operacion.transportes?.[0]?.TransportistaNombre || "").toLowerCase().includes(nuevoValor.toLowerCase())
      );
      setOperaciones(operacionesFiltradas);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBuscarInput();
    }
  };

  const handleVerDetalle = (idOperacion) => {
    navigate(`/operaciones/${idOperacion}`);
  };

  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString("es-AR");
  };

  return (
    <>
      {!modalAbierto && mostrarTabla && (
        <div className="btn-volver-container" style={{ textAlign: "left", width: "85%", marginTop: "10px" }}>
          <button className="btn-volver" onClick={onVolver}>
            <span className="material-symbols-outlined" style={{ marginRight: "12px" }}>arrow_back</span>
            VOLVER A OPERACIONES
          </button>
        </div>
      )}

      {mostrarTabla && (
        <div className="input-buscar" style={{ margin: "20px 0", width: "85%", display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            placeholder="Buscar operación"
            className="input-buscari"
            name="inputBuscar"
            value={valorBusqueda}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <button className="btn-buscar" onClick={handleBuscarInput}>
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      )}

      {!mostrarTabla && (
        <div className="gastos-filter" style={{ marginTop: "20px" }}>
          <h4 style={{ margin: "0 0 15px 0" }}>SELECCIONAR FECHA</h4>
          <div className="filter-row">
            <div className="filter-group">
              <label>Mes</label>
              <select value={mes} onChange={(e) => setMes(e.target.value)}>
                <option value="">Seleccionar mes</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString("es-AR", { month: "long" })}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Año</label>
              <select value={anio} onChange={(e) => setAnio(e.target.value)}>
                <option value="">Seleccionar año</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>

            <button className="btn-search" onClick={handleBuscarFiltro} disabled={loading}>
              {loading ? "CARGANDO..." : "BUSCAR"}
            </button>
          </div>
        </div>
      )}

      {mostrarTabla && (
        <div className="tabla-container">
          {loading ? (
            <p>Cargando operaciones...</p>
          ) : (
            <table className="tabla-gastos">
              <thead>
                <tr>
                  <th>N° Operación</th>
                  <th>Fecha de Carga</th>
                  <th>Producto</th>
                  <th>Productor</th>
                  <th>Cliente</th>
                  <th>Transportista</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {operaciones.length > 0 ? (
                  operaciones.map((operacion) => (
                    <tr key={operacion.idOperacion} className="fila-tabla">
                      <td>{operacion.idOperacion}</td>
                      <td>{formatearFecha(operacion.FechaOperacion)}</td>
                      <td>{operacion.compras?.[0]?.ProductoNombre || operacion.ventas?.[0]?.ProductoNombre || "Sin producto"}</td>
                      <td>{operacion.compras?.[0]?.ProductorNombre ? `${operacion.compras[0].ProductorNombre} ${operacion.compras[0].ProductorApellido}` : "No aplica"}</td>
                      <td>{operacion.ventas?.[0]?.ClienteNombre ? `${operacion.ventas[0].ClienteNombre} ${operacion.ventas[0].ClienteApellido}` : "No aplica"}</td>
                      <td>{operacion.transportes?.[0]?.TransportistaNombre ? `${operacion.transportes[0].TransportistaNombre} ${operacion.transportes[0].TransportistaApellido}` : "No aplica"}</td>
                      <td>
                        <div className="td-acciones">
                          <button className="btn-view" onClick={() => handleVerDetalle(operacion.idOperacion)} title="Ver detalle">
                            <span className="material-symbols-outlined">visibility</span>
                          </button>
                          <button className="btn-history" title="Historial">
                            <span className="material-symbols-outlined">history</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No se encontraron operaciones para {mes}/{anio}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
}

 

export default OperacionesFilter;
