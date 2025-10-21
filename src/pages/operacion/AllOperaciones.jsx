import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { traerOperacionesFiltradas } from "../../services/operacionesService";
import "../../styles/operaciones/Operaciones.css";
import OperacionHeader from "../../components/operacion/OperacionesHeader";
import OperacionButtonAdd from "../../components/operacion/OperacionesButtonAdd";
import OperacionesButtonExportar from "../../components/operacion/OperacionesButtonExportar";

const AllOperaciones = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const mes = queryParams.get("mes");
  const anio = queryParams.get("anio");

  const [operaciones, setOperaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [valorBusqueda, setValorBusqueda] = useState("");
  const [operacionesOriginales, setOperacionesOriginales] = useState([]);

  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString("es-AR");
  };

  const fetchData = async () => {
    if (mes && anio) {
      setLoading(true);
      try {
        const data = await traerOperacionesFiltradas(mes, anio);
        setOperaciones(data);
        setOperacionesOriginales(data);
      } catch (err) {
        console.error("Error al traer operaciones:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [mes, anio]);

  const handleVerDetalle = (idOperacion) => {
    navigate(`/operaciones/${idOperacion}`, {
      state: { mes, anio },
    });
  };

  const obtenerNombreMes = (numeroMes) => {
    const nombresMeses = [
      "ENERO",
      "FEBRERO",
      "MARZO",
      "ABRIL",
      "MAYO",
      "JUNIO",
      "JULIO",
      "AGOSTO",
      "SEPTIEMBRE",
      "OCTUBRE",
      "NOVIEMBRE",
      "DICIEMBRE",
    ];
    return nombresMeses[numeroMes - 1] || "Mes inválido";
  };

  const handleBuscar = () => {
    const valor = valorBusqueda.trim().toLowerCase();
    if (valor === "") {
      setOperaciones(operacionesOriginales);
    } else {
      const filtradas = operacionesOriginales.filter((op) => {
        const productor = `${op.compras?.[0]?.ProductorNombre || ""} ${
          op.compras?.[0]?.ProductorApellido || ""
        }`;
        const cliente = `${op.ventas?.[0]?.ClienteNombre || ""} ${
          op.ventas?.[0]?.ClienteApellido || ""
        }`;
        const transportista = `${
          op.transportes?.[0]?.TransportistaNombre || ""
        } ${op.transportes?.[0]?.TransportistaApellido || ""}`;
        return (
          productor.toLowerCase().includes(valor) ||
          cliente.toLowerCase().includes(valor) ||
          transportista.toLowerCase().includes(valor) ||
          (op.compras?.[0]?.ProductoNombre || "").toLowerCase().includes(valor)
        );
      });
      setOperaciones(filtradas);
    }
  };

  const handleChange = (e) => {
    setValorBusqueda(e.target.value);
  };
  useEffect(() => {
    const valor = valorBusqueda.trim().toLowerCase();
    if (valor === "") {
      setOperaciones(operacionesOriginales);
    } else {
      const filtradas = operacionesOriginales.filter((op) => {
        const productor = `${op.compras?.[0]?.ProductorNombre || ""} ${
          op.compras?.[0]?.ProductorApellido || ""
        }`;
        const cliente = `${op.ventas?.[0]?.ClienteNombre || ""} ${
          op.ventas?.[0]?.ClienteApellido || ""
        }`;
        const transportista = `${
          op.transportes?.[0]?.TransportistaNombre || ""
        } ${op.transportes?.[0]?.TransportistaApellido || ""}`;
        const producto = `${op.compras?.[0]?.ProductoNombre || ""}`;
        return (
          productor.toLowerCase().includes(valor) ||
          cliente.toLowerCase().includes(valor) ||
          transportista.toLowerCase().includes(valor) ||
          producto.toLowerCase().includes(valor)
        );
      });
      setOperaciones(filtradas);
    }
  }, [valorBusqueda, operacionesOriginales]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBuscar();
    }
  };

  if (loading) {
    return (
      <div className="tabla-container">
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="operaciones-page">
        <OperacionHeader />
        <h4 className="dato-header">
          {obtenerNombreMes(Number(mes))} {anio}
        </h4>
        <OperacionButtonAdd onOperacionAgregada={fetchData} />
        <OperacionesButtonExportar />
        <div className="input-buscar">
          <input
            type="text"
            placeholder="Buscar por nombre, producto o transportista"
            className="input-buscari"
            name="inputBuscar"
            value={valorBusqueda}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <button className="btn-buscar" onClick={handleBuscar}>
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>

        <div className="tabla-container" style={{ marginTop: "20px" }}>
          <button className="btn-volver" onClick={() => navigate(`/operacion`)}>
            <span className="material-symbols-outlined">arrow_back</span>
            VOLVER A OPERACIONES
          </button>
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
                      <td>
                        {operacion.compras?.[0]?.ProductoNombre ||
                          "Sin producto"}
                      </td>
                      <td>
                        {operacion.compras?.[0]?.ProductorNombre
                          ? `${operacion.compras[0].ProductorNombre} ${operacion.compras[0].ProductorApellido}`
                          : "No aplica"}
                      </td>
                      <td>
                        {operacion.ventas?.[0]?.ClienteNombre
                          ? `${operacion.ventas[0].ClienteNombre} ${operacion.ventas[0].ClienteApellido}`
                          : "No aplica"}
                      </td>
                      <td>
                        {operacion.transportes?.[0]?.TransportistaNombre
                          ? `${operacion.transportes[0].TransportistaNombre} ${operacion.transportes[0].TransportistaApellido}`
                          : "No aplica"}
                      </td>
                      <td>
                        <div className="td-acciones">
                          <button
                            className="btn-view"
                            onClick={() =>
                              handleVerDetalle(operacion.idOperacion)
                            }
                            title="Ver detalle"
                          >
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          </button>
                          <button className="btn-history" title="Historial">
                            <span className="material-symbols-outlined">
                              history
                            </span>
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
      </div>
    </>
  );
};

export default AllOperaciones;
