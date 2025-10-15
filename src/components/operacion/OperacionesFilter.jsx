import { useState, useEffect } from "react";
import {
  traerOperacionesFiltradas,
  traerOperacionCompleta,
} from "../../services/operacionesService";
import "../../styles/operaciones/Operaciones.css";

const OperacionesFilter = ({
  onVolver,
  onBuscar,
  mostrarTabla,
  modalAbierto,
  onMostrarDetalleChange 
}) => {
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");
  const [operaciones, setOperaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [operacionDetalle, setOperacionDetalle] = useState(null);
  const [operacionesOriginales, setOperacionesOriginales] = useState([]);
  const [valorBusqueda, setValorBusqueda] = useState("");
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);
  const [showModal, setShowModal] = useState(false);


  // BUSCAR OPERACIONES POR MES/AÑO 
  const handleBuscarFiltro = async () => {
    if (mes && anio) {
      setLoading(true);
      try {
        const data = await traerOperacionesFiltradas(mes, anio);
        setOperaciones(data);
        setOperacionesOriginales(data); // ✅ GUARDAR COPIA ORIGINAL
        onBuscar();
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

  // BUSCAR EN LA LISTA ACTUAL (input de búsqueda)
  const handleBuscarInput = () => {
    if (valorBusqueda === "") {
      // Si está vacío, mostrar todas las operaciones
      setOperaciones(operacionesOriginales);
    } else {
      // Filtrar operaciones
      const operacionesFiltradas = operacionesOriginales.filter(
        (operacion) =>
          operacion.idOperacion.toString().includes(valorBusqueda) ||
          formatearFecha(operacion.FechaRegistro).includes(valorBusqueda) ||
          (operacion.compras?.[0]?.ProductoNombre || "")
            .toLowerCase()
            .includes(valorBusqueda.toLowerCase()) ||
          (operacion.compras?.[0]?.ProductorNombre || "")
            .toLowerCase()
            .includes(valorBusqueda.toLowerCase()) ||
          (operacion.compras?.[0]?.ProductorApellido || "")
            .toLowerCase()
            .includes(valorBusqueda.toLowerCase()) ||
          (operacion.ventas?.[0]?.ClienteNombre || "")
            .toLowerCase()
            .includes(valorBusqueda.toLowerCase()) ||
          (operacion.ventas?.[0]?.ClienteApellido || "")
            .toLowerCase()
            .includes(valorBusqueda.toLowerCase()) ||
          (operacion.transportes?.[0]?.TransportistaNombre || "")
            .toLowerCase()
            .includes(valorBusqueda.toLowerCase())
      );
      setOperaciones(operacionesFiltradas);
    }
  };

  // BUSCAR AL ESCRIBIR (búsqueda en tiempo real)
  const handleChange = (e) => {
    const nuevoValor = e.target.value;
    setValorBusqueda(nuevoValor);

    if (nuevoValor === "") {
      // Si se borra la búsqueda, mostrar todas
      setOperaciones(operacionesOriginales);
    } else {
      // Filtrar en tiempo real
      const operacionesFiltradas = operacionesOriginales.filter(
        (operacion) =>
          operacion.idOperacion.toString().includes(nuevoValor) ||
          formatearFecha(operacion.FechaRegistro).includes(nuevoValor) ||
          (operacion.compras?.[0]?.ProductoNombre || "")
            .toLowerCase()
            .includes(nuevoValor.toLowerCase()) ||
          (operacion.compras?.[0]?.ProductorNombre || "")
            .toLowerCase()
            .includes(nuevoValor.toLowerCase()) ||
          (operacion.ventas?.[0]?.ClienteNombre || "")
            .toLowerCase()
            .includes(nuevoValor.toLowerCase()) ||
          (operacion.transportes?.[0]?.TransportistaNombre || "")
            .toLowerCase()
            .includes(nuevoValor.toLowerCase())
      );
      setOperaciones(operacionesFiltradas);
    }
  };

  //  BUSCAR AL PRESIONAR ENTER
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBuscarInput();
    }
  };

  //para ver el detalle de una operación
  const handleVerDetalle = async (idOperacion) => {
    setCargandoDetalle(true);
    try {
      // Buscar la operación en los datos que YA TENEMOS cargados
      const operacionExistente = operaciones.find(
        (op) => op.idOperacion === idOperacion
      );

      if (operacionExistente) {
        // Usar los datos que ya tenemos
        setOperacionDetalle({
          operacion: operacionExistente,
          movimientos: {
            compras: operacionExistente.compras || [],
            ventas: operacionExistente.ventas || [],
            transportes: operacionExistente.transportes || [],
          },
          resumen: {
            totalCompras: operacionExistente.compras?.length || 0,
            totalVentas: operacionExistente.ventas?.length || 0,
            totalTransportes: operacionExistente.transportes?.length || 0,
          },
        });
        setMostrarDetalle(true)
        onMostrarDetalleChange(true);;
      } else {
        const data = await traerOperacionCompleta(idOperacion);
        setOperacionDetalle(data);
        setMostrarDetalle(true);
      }
    } catch (err) {
      console.error("Error al cargar detalle:", err);
      alert("Error al cargar los detalles de la operación");
    } finally {
      setCargandoDetalle(false);
    }
  };

  // seguir una vez actualizado operaciones
  // const handleCrearCliente = async (data) => {
  //   try {
  //     const operacionCliente = {

  //       IdOperacion: data.IdOperacion,
  //     IdPersona: data.IdPersona,
  //     IdProducto: data.IdProducto,
  //     PrecioUnitario: data.PrecioUnitario,
  //     ToneladasCompradas: data.ToneladasCompradas,
  //     TotalCompra: data.TotalCompra,
  //     FechaCompra: data.FechaCompra,
  //     Descripcion: data.Descripcion,
  //     idUsuario: data.idUsuario || 1, // O obtenerlo del contexto/auth
  //     };

  //     console.log("Enviando datos al backend:", operacionCliente);
  //     const nuevaOperacion = await crearOperacion(operacionCliente);
  //     console.log("Operación creada:", nuevaOperacion);

  //     alert("Operación creada correctamente");
  //     setShowModal(false);
      
  //   } catch (error) {
  //     console.error("Error al guardar operación:", error);
  //     if (error.response?.data?.message) {
  //       alert(`Error: ${error.response.data.message}`);
  //     } else {
  //       alert("Error al crear la operación");
  //     }
  //   }
  // };


  // volver a la vista general
  const handleVolver = () => {
    setMostrarDetalle(false);
    setOperacionDetalle(null);
    onMostrarDetalleChange(false);
  };

  // Función para formatear fecha
  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString("es-AR");
  };

  // Función para formatear moneda
  const formatearMoneda = (monto) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(monto);
  };

  if (loading) {
    return (
      <div className="tabla-container">
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>Cargando operaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {mostrarTabla && !modalAbierto && !mostrarDetalle && (
        <div
          className="btn-volver-container"
          style={{ textAlign: "left", width: "85%", marginTop: "10px" }}
        >
          <button className="btn-volver" onClick={onVolver}>
            <span
              className="material-symbols-outlined"
              style={{ marginRight: "12px" }}
            >
              arrow_back
            </span>
            VOLVER A OPERACIONES
          </button>
        </div>
      )}
      {mostrarTabla && !mostrarDetalle && (
        <div
          className="input-buscar"
          style={{
            margin: "20px 0",
            width: "85%",
            display: "flex",
            justifyContent: "center",
          }}
        >
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
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
                <option value="4">Abril</option>
                <option value="5">Mayo</option>
                <option value="6">Junio</option>
                <option value="7">Julio</option>
                <option value="8">Agosto</option>
                <option value="9">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
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

            <button
              className="btn-search"
              onClick={handleBuscarFiltro}
              disabled={loading}
            >
              {loading ? "CARGANDO..." : "BUSCAR"}
            </button>
          </div>
        </div>
      )}

      {/*GENERAL DE OPERACIONES */}
      {mostrarTabla && !mostrarDetalle && (
        <div className="tabla-container">
          {loading ? (
            <p>Cargando operaciones...</p>
          ) : (
            <table className="tabla-gastos">
              <thead>
                <tr>
                  <th>N° Operacion</th>
                  <th>Fecha de Carga</th>
                  <th>Producto</th>
                  <th>Productor</th>
                  <th>Cliente</th>
                  <th>Transportista</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {operaciones.length > 0 ? (
                  operaciones.map((operacion) => (
                    <tr key={operacion.idOperacion} className="fila-tabla">
                      <td>{operacion.idOperacion}</td>
                      <td>{formatearFecha(operacion.FechaRegistro)}</td>
                      <td>
                        {operacion.compras?.[0]?.ProductoNombre ||
                          operacion.ventas?.[0]?.ProductoNombre ||
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
                            disabled={cargandoDetalle}
                            title="Ver detalle"
                          >
                            <span className="material-symbols-outlined">
                              {cargandoDetalle
                                ? "hourglass_empty"
                                : "visibility"}
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
      )}

      {/* DETALLE DE OPERACIÓN */}
{mostrarDetalle && operacionDetalle && (
  <div className="tabla-container">
    <div className="tabla-header">
      <button className="btn-volver" onClick={handleVolver}>
        <span className="material-symbols-outlined">arrow_back</span>
        VOLVER A OPERACIONES
      </button>
      <h4>Informacion de la Operacion #{operacionDetalle.operacion.idOperacion}</h4>
      <p><strong>Descripción:</strong> {operacionDetalle.operacion.Descripcion || "Sin descripción"}</p>
    </div>

    {/* Tabla de Compras - SIEMPRE VISIBLE */}
    <div className="tabla-seccion">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h5 style={{color:"#0097B2", fontSize:"medium"}}>PRODUCTOR</h5>
        <button className="btnagregar" onClick={() => setShowModal(true)}>
          + AGREGAR
        </button>
      </div>

      <table className="tabla-gastos">
        <thead>
          <tr>
            <th>Fecha de Carga</th>
            <th>Productor</th>
            <th>Precio de Compra</th>
            <th>Cargas TN.</th>
            <th>Total $Pesos</th>
            <th>CP N°</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {operacionDetalle.movimientos.compras.length > 0 ? (
            operacionDetalle.movimientos.compras.map((compra) => (
              <tr key={compra.idMovCompra} className="fila-tabla">
                <td>{formatearFecha(operacionDetalle.operacion.FechaRegistro)}</td>
                <td>
                  {compra.ProductorNombre && compra.ProductorApellido
                    ? `${compra.ProductorNombre} ${compra.ProductorApellido}`
                    : "No especificado"}
                </td>
                <td>{formatearMoneda(compra.PrecioUnitario)}</td>
                <td>{compra.ToneladasCompradas}</td>
                <td>{formatearMoneda(compra.TotalCompra)}</td>
                <td>{compra.CPNumero || "No especificado"}</td>
                <td>
                  <div className="td-acciones">
                    <button className="btn-edit">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", color: "#999", fontStyle: "italic" }}>
                No hay compras registradas. Haz clic en "AGREGAR" para agregar una.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <hr className="linea-separadora" />

    {/* Tabla de Ventas - SIEMPRE VISIBLE */}
    <div className="tabla-seccion">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h5 style={{color:"#0097B2", fontSize:"medium"}}>CLIENTE</h5>
        <button className="btnagregar" onClick={() => setShowModal(true)}>
          + AGREGAR
        </button>
      </div>
      <table className="tabla-gastos">
        <thead>
          <tr>
            <th>Fecha de Venta</th>
            <th>Cliente</th>
            <th>Precio de Venta</th>
            <th>Descargas TN.</th>
            <th>Total $Pesos</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {operacionDetalle.movimientos.ventas.length > 0 ? (
            operacionDetalle.movimientos.ventas.map((venta) => (
              <tr key={venta.idMovVenta} className="fila-tabla">
                <td>{formatearFecha(venta.FechaVenta)}</td>
                <td>
                  {venta.ClienteNombre && venta.ClienteApellido
                    ? `${venta.ClienteNombre} ${venta.ClienteApellido}`
                    : "No especificado"}
                </td>
                <td>{formatearMoneda(venta.PrecioUnitario)}</td>
                <td>{venta.ToneladasVendidas}</td>
                <td>{formatearMoneda(venta.TotalVenta)}</td>
                <td>
                  <div className="td-acciones">
                    <button className="btn-edit">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", color: "#999", fontStyle: "italic" }}>
                No hay ventas registradas. Haz clic en "AGREGAR" para agregar una.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <hr className="linea-separadora" />

    {/* Tabla de Transportes - SIEMPRE VISIBLE */}
    <div className="tabla-seccion">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h5 style={{color:"#0097B2", fontSize:"medium"}}>TRANSPORTE</h5>
        <button className="btnagregar" onClick={() => setShowModal(true)}>
          + AGREGAR
        </button>
      </div>
      <table className="tabla-gastos">
        <thead>
          <tr>
            <th>Fecha de Salida</th>
            <th>Transportista</th>
            <th>Dif TN.</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Descargas TN.</th>
            <th>Km.</th>
            <th>Precio por Km.</th>
            <th>Chofer</th>
            <th>Flete Total</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {operacionDetalle.movimientos.transportes.length > 0 ? (
            operacionDetalle.movimientos.transportes.map((transporte) => (
              <tr key={transporte.idMovTransporte} className="fila-tabla">
                <td>{formatearFecha(transporte.FechaTransporte)}</td>
                <td>
                  {transporte.TransportistaNombre && transporte.TransportistaApellido
                    ? `${transporte.TransportistaNombre} ${transporte.TransportistaApellido}`
                    : "No especificado"}
                </td>
                <td>
                  {(
                    (operacionDetalle.movimientos.compras?.[0]?.ToneladasCompradas || 0) -
                    (operacionDetalle.movimientos.ventas?.[0]?.ToneladasVendidas || 0)
                  ).toFixed(2)}
                </td>
                <td>{transporte.Origen}</td>
                <td>{transporte.Destino}</td>
                <td>{operacionDetalle.movimientos.ventas?.[0]?.ToneladasVendidas || 0}</td>
                <td>{transporte.Kilometros}</td>
                <td>{formatearMoneda(transporte.PrecioXKm)}</td>
                <td>{transporte.NombreChofer}</td>
                <td>
                  {formatearMoneda(
                    (operacionDetalle.movimientos.ventas?.[0]?.ToneladasVendidas || 0) * transporte.PrecioXKm
                  )}
                </td>
                <td>
                  <div className="td-acciones">
                    <button className="btn-edit">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" style={{ textAlign: "center", color: "#999", fontStyle: "italic" }}>
                No hay transportes registrados. Haz clic en "AGREGAR" para agregar uno.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div> 
)}
    </>
  );
};

export default OperacionesFilter;
