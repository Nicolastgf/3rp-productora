import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  traerOperacionCompleta,
  crearCompra,
  crearVenta,
  obtenerProductosActivos,
  obtenerProductosActivosPorId,
  crearTransportes,
  editarCompra,
  traerCompraPorId,
  editarVenta,
  traerVentaPorId,
  editarTransporte,
  traerTransportePorId,
} from "../../services/operacionesService";
import { traerPersonasPorTipo } from "../../services/personasService";
import {
  configCompra,
  configVenta,
  configTransporte,
} from "../../config/FormConfigs";
import ModalForm from "../../components/common/ModalForm";
import "../../styles/operaciones/Operaciones.css";
import "../../styles/modal/Modal.css";
import "../../styles/gastos/Gastos.css";
import OperacionHeader from "../../components/operacion/OperacionesHeader";

const OperacionDetalle = () => {
  const { id } = useParams();
  const location = useLocation();
  const { mes, anio } = location.state || {};
  const navigate = useNavigate();
  const [operacionDetalle, setOperacionDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [listaProductores, setListaProductores] = useState([]);
  const [listaClientes, setListaClientes] = useState([]);
  const [listaTransportistas, setListaTransportistas] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);
  const [nombreProducto, setNombreProducto] = useState("");
  const [compraSeleccionada, setCompraSeleccionada] = useState(null);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [transporteSeleccionado, setTransporteSeleccionado] = useState(null);

  useEffect(() => {
    cargarDetalle();
  }, [id]);

  useEffect(() => {
    if (showModal) cargarDatosSelects();
  }, [showModal]);

  const cargarDetalle = async () => {
    try {
      const data = await traerOperacionCompleta(id);
      setOperacionDetalle(data);

      //cargar nombre del producto directamente después de actualizar el estado
      const idProducto = data?.movimientos?.compras?.[0]?.IdProducto;
      if (idProducto) {
        cargarNombreProducto(idProducto);
      } else {
        setNombreProducto("Producto no especificado");
      }
    } catch (error) {
      console.error("Error al cargar detalle:", error);
      alert("No se pudo cargar la operación");
    } finally {
      setLoading(false);
    }
  };

  const cargarNombreProducto = async (id) => {
    try {
      const producto = await obtenerProductosActivosPorId(id);
      //   console.log(producto[0].NombreProducto)
      setNombreProducto(producto[0].NombreProducto || "Producto desconocido");
    } catch (error) {
      console.error("Error al obtener el nombre del producto:", error);
      setNombreProducto("Producto no encontrado");
    }
  };

  const cargarDatosSelects = async () => {
    try {
      const [productoresData, productosData, clientesData, transportistasData] =
        await Promise.all([
          traerPersonasPorTipo("Productor"),
          obtenerProductosActivos(),
          traerPersonasPorTipo("Cliente"),
          traerPersonasPorTipo("Transportista"),
        ]);
      setListaProductores(productoresData);
      setListaProductos(productosData);
      setListaClientes(clientesData);
      setListaTransportistas(transportistasData);
    } catch (error) {
      console.error("Error cargando datos para los modales:", error);
    }
  };

  const handleCrearCompra = async (data) => {
    try {
      const compraData = {
        IdOperacion: operacionDetalle.operacion.idOperacion,
        IdPersona: data.IdPersona,
        IdProducto: data.IdProducto,
        PrecioUnitario: parseFloat(data.PrecioUnitario),
        ToneladasCompradas: parseFloat(data.ToneladasCompradas),
        FechaCompra: data.FechaCompra,
        Descripcion: data.Descripcion || `Compra para operación ${id}`,
        idUsuario: data.idUsuario || 1,
      };
      await crearCompra(compraData);
      alert("Compra creada correctamente");
      setShowModal(false);
      cargarDetalle();
    } catch (error) {
      console.error("Error al guardar la compra:", error);
      alert("Error al crear la compra");
    }
  };

  const handleCrearVenta = async (data) => {
    try {
      const idProductoDeCompra =
        operacionDetalle?.movimientos?.compras?.[0]?.IdProducto;
      if (!idProductoDeCompra) {
        alert("No se puede registrar una venta sin compra previa");
        return;
      }
      const ventaData = {
        IdOperacion: operacionDetalle.operacion.idOperacion,
        IdPersona: data.IdPersona,
        IdProducto: idProductoDeCompra,
        PrecioUnitario: parseFloat(data.PrecioUnitario),
        ToneladasVendidas: parseFloat(data.ToneladasVendidas),
        FechaVenta: data.FechaVenta,
        Descripcion: data.Descripcion || `Venta para operación ${id}`,
        idUsuario: data.idUsuario || 1,
      };
      await crearVenta(ventaData);
      alert("Venta creada correctamente");
      setShowModal(false);
      cargarDetalle();
    } catch (error) {
      console.error("Error al guardar la venta:", error);
      alert("Error al crear la venta");
    }
  };

  const handleCrearTransporte = async (data) => {
    try {
      const transporteData = {
        IdOperacion: operacionDetalle.operacion.idOperacion,
        IdPersona: data.IdPersona,
        NombreChofer: data.NombreChofer,
        Origen: data.Origen,
        Destino: data.Destino,
        DescargasToneladas: parseFloat(data.DescargasToneladas),
        Kilometros: parseFloat(data.Kilometros),
        FechaTransporte: data.FechaTransporte,
        Descripcion: data.Descripcion || `Transporte para operación ${id}`,
        idUsuario: data.idUsuario || 1,
      };
      console.log("datos enviados al backend:", transporteData);
      if (
        !transporteData.IdOperacion ||
        !transporteData.IdPersona ||
        !transporteData.idUsuario ||
        !transporteData.Kilometros ||
        !transporteData.DescargasToneladas ||
        !transporteData.Origen ||
        !transporteData.Destino
      ) {
        alert("Faltan campos obligatorios para registrar el transporte");
        return;
      }

      await crearTransportes(transporteData);
      alert("Transporte creada correctamente");
      setShowModal(false);
      cargarDetalle();
    } catch (error) {
      console.error("Error al guardar el transporte:", error);
      alert("Error al crear el transporte");
    }
  };

  const handleEditarCompra = async (data) => {
    try {
      const compraEditada = {
        IdOperacion: operacionDetalle.operacion.idOperacion,
        IdPersona: data.IdPersona,
        IdProducto: data.IdProducto,
        PrecioUnitario: parseFloat(data.PrecioUnitario),
        ToneladasCompradas: parseFloat(data.ToneladasCompradas),
        FechaCompra: data.FechaCompra,
        Descripcion: data.Descripcion || `Compra actualizada operación ${id}`,
        idUsuario: data.idUsuario || 1,
      };
      await editarCompra(compraEditada, compraSeleccionada.idMovCompra);
      alert("Compra actualizada correctamente");
      setShowModal(false);
      setCompraSeleccionada(null);
      cargarDetalle();
    } catch (error) {
      console.error("Error al editar la compra:", error);
      alert("Error al actualizar la compra");
    }
  };

  const handleEditarVenta = async (data) => {
    try {
      const ventaEditada = {
        IdOperacion: operacionDetalle.operacion.idOperacion,
        IdPersona: data.IdPersona,
        IdProducto:
          operacionDetalle.movimientos.compras?.[0]?.IdProducto ||
          data.IdProducto,
        PrecioUnitario: parseFloat(data.PrecioUnitario),
        ToneladasVendidas: parseFloat(data.ToneladasVendidas),
        FechaVenta: data.FechaVenta,
        Descripcion: data.Descripcion || `Venta actualizada operación ${id}`,
        Estado: data.Estado || "Pendiente", 
        idUsuario: data.idUsuario || 1,
      };

      await editarVenta(ventaEditada, ventaSeleccionada.idMovVenta);
      alert("Venta actualizada correctamente");
      setShowModal(false);
      setVentaSeleccionada(null);
      cargarDetalle();
    } catch (error) {
      console.error("Error al editar la venta:", error);
      alert("Error al actualizar la venta");
    }
  };

  const handleEditarTransporte = async (data) => {
    try {
      const transporteEditado = {
        IdOperacion: operacionDetalle.operacion.idOperacion,
        IdPersona: data.IdPersona,
        NombreChofer: data.NombreChofer,
        Origen: data.Origen,
        Destino: data.Destino,
        DescargasToneladas: parseFloat(data.DescargasToneladas),
        Kilometros: parseFloat(data.Kilometros),
        FechaTransporte: data.FechaTransporte,
        Descripcion:
          data.Descripcion || `Transporte actualizado operación ${id}`,
        Estado: data.Estado || "Pendiente",
        idUsuario: data.idUsuario || 1,
      };
      await editarTransporte(
        transporteEditado,
        transporteSeleccionado.idMovTransporte
      );
      alert("Transporte actualizado correctamente");
      setShowModal(false);
      setTransporteSeleccionado(null);
      cargarDetalle();
    } catch (error) {
      console.error("Error al editar el transporte:", error);
      alert("Error al actualizar el transporte");
    }
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const getModalConfig = () => {
    switch (modalType) {
      case "compra":
        return {
          config: {
            ...configCompra,
            campos: configCompra.campos.map((campo) => {
              if (campo.name === "IdPersona")
                return {
                  ...campo,
                  type: "select",
                  options: listaProductores.map((p) => ({
                    value: p.idPersona,
                    label: `${p.NombrePersona} ${p.ApellidoPersona}`,
                  })),
                };
              if (campo.name === "IdProducto")
                return {
                  ...campo,
                  type: "select",
                  options: listaProductos.map((p) => ({
                    value: p.idProducto,
                    label: p.NombreProducto,
                  })),
                };
              return campo;
            }),
          },
          onSubmit: handleCrearCompra,
        };
      case "venta":
        return {
          config: {
            ...configVenta,
            campos: configVenta.campos
              .filter((campo) => campo.name !== "IdProducto")
              .map((campo) => {
                if (campo.name === "IdPersona")
                  return {
                    ...campo,
                    type: "select",
                    options: listaClientes.map((p) => ({
                      value: p.idPersona,
                      label: `${p.NombrePersona} ${p.ApellidoPersona}`,
                    })),
                  };
                return campo;
              }),
          },
          onSubmit: handleCrearVenta,
        };
      case "transporte":
        return {
          config: {
            ...configTransporte,
            campos: configTransporte.campos.map((campo) => {
              if (campo.name === "IdPersona")
                return {
                  ...campo,
                  type: "select",
                  options: listaTransportistas.map((p) => ({
                    value: p.idPersona,
                    label: `${p.NombrePersona} ${p.ApellidoPersona}`,
                  })),
                };
              return campo;
            }),
          },
          onSubmit: handleCrearTransporte,
        };
      case "editarCompra":
        return {
          config: {
            ...configCompra,
            campos: configCompra.campos.map((campo) => {
              if (campo.name === "IdPersona") {
                return {
                  ...campo,
                  type: "select",
                  options: listaProductores.map((p) => ({
                    value: p.idPersona,
                    label: `${p.NombrePersona} ${p.ApellidoPersona}`,
                  })),
                };
              }

              if (campo.name === "IdProducto") {
                return {
                  ...campo,
                  type: "select",
                  options: listaProductos.map((p) => ({
                    value: p.idProducto,
                    label: p.NombreProducto,
                  })),
                };
              }
              return campo;
            }),
          },
          onSubmit: handleEditarCompra,
        };
      case "editarVenta":
        return {
          config: {
            ...configVenta,
            campos: configVenta.campos
              .filter((campo) => campo.name !== "IdProducto")
              .map((campo) => {
                if (campo.name === "IdPersona") {
                  return {
                    ...campo,
                    type: "select",
                    options: listaClientes.map((p) => ({
                      value: p.idPersona,
                      label: `${p.NombrePersona} ${p.ApellidoPersona}`,
                    })),
                  };
                }
                return campo;
              }),
          },
          onSubmit: handleEditarVenta,
        };
      case "editarTransporte":
        return {
          config: {
            ...configTransporte,
            campos: configTransporte.campos.map((campo) => {
              if (campo.name === "IdPersona") {
                return {
                  ...campo,
                  type: "select",
                  options: listaTransportistas.map((p) => ({
                    value: p.idPersona,
                    label: `${p.NombrePersona} ${p.ApellidoPersona}`,
                  })),
                };
              }
              return campo;
            }),
          },
          onSubmit: handleEditarTransporte,
        };

      default:
        return { config: { titulo: "", campos: [] }, onSubmit: () => {} };
    }
  };

  const formatearFecha = (fechaString) =>
    new Date(fechaString).toLocaleDateString("es-AR");
  const formatearMoneda = (monto) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(monto);

  if (loading) return <p>Cargando operación...</p>;
  if (!operacionDetalle) return <p>No se encontró la operación</p>;

  const modalProps = getModalConfig();

  const totalComprado = operacionDetalle.movimientos.compras.reduce(
    (acc, compra) =>
      acc + parseFloat(String(compra.ToneladasCompradas).replace(",", ".")),
    0
  );

  const totalVendido = operacionDetalle.movimientos.ventas.reduce(
    (acc, venta) =>
      acc + parseFloat(String(venta.ToneladasVendidas).replace(",", ".")),
    0
  );

  const diferenciaToneladas = (totalComprado - totalVendido).toFixed(2);

  return (
    <>
      <div className="operaciones-page">
        <OperacionHeader />
        <div className="tabla-container">
          <button
            className="btn-volver"
            onClick={() =>
              navigate(`/operaciones/detalle?mes=${mes}&anio=${anio}`)
            }
          >
            <span className="material-symbols-outlined">arrow_back</span>
            VOLVER A OPERACIONES
          </button>

          <h4>Operación #{operacionDetalle.operacion.idOperacion}</h4>
          <p>
            <strong>Producto:</strong> {nombreProducto}
          </p>

          <p>
            <strong>Descripción:</strong>{" "}
            {operacionDetalle.operacion.Descripcion || "Sin descripción"}
          </p>

          {/* COMPRAS */}
          <div className="tabla-seccion">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h5 style={{ color: "#0097B2", fontSize: "medium" }}>
                PRODUCTOR
              </h5>
              <button
                className="btnagregar"
                onClick={() => handleOpenModal("compra")}
              >
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
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {operacionDetalle.movimientos.compras.length > 0 ? (
                  operacionDetalle.movimientos.compras.map((compra) => (
                    <tr key={compra.idMovCompra} className="fila-tabla">
                      <td>{formatearFecha(compra.FechaCompra)}</td>
                      <td>{`${compra.ProductorNombre} ${compra.ProductorApellido}`}</td>
                      <td>{formatearMoneda(compra.PrecioUnitario)}</td>
                      <td>{compra.ToneladasCompradas}</td>
                      <td>{formatearMoneda(compra.TotalCompra)}</td>
                      <td>
                        <div className="td-acciones">
                          <button
                            className="btn-edit"
                            title="Editar compra"
                            onClick={async () => {
                              try {
                                const compraCompleta = await traerCompraPorId(
                                  compra.idMovCompra
                                );
                                setCompraSeleccionada(compraCompleta);
                                setModalType("editarCompra");
                                setTimeout(() => setShowModal(true), 0);
                              } catch (error) {
                                console.error("Error al cargar compra:", error);
                                alert(
                                  "No se pudo cargar la compra para editar"
                                );
                              }
                            }}
                          >
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        color: "#999",
                        fontStyle: "italic",
                      }}
                    >
                      No hay compras registradas. Haz clic en "AGREGAR" para
                      agregar una.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* VENTAS */}
          <div className="tabla-seccion">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h5 style={{ color: "#0097B2", fontSize: "medium" }}>CLIENTE</h5>
              <button
                className="btnagregar"
                onClick={() => handleOpenModal("venta")}
              >
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
                      <td>{`${venta.ClienteNombre} ${venta.ClienteApellido}`}</td>
                      <td>{formatearMoneda(venta.PrecioUnitario)}</td>
                      <td>{venta.ToneladasVendidas}</td>
                      <td>{formatearMoneda(venta.TotalVenta)}</td>
                      <td>
                        <div className="td-acciones">
                          <button
                            className="btn-edit"
                            title="Editar venta"
                            onClick={async () => {
                              try {
                                const ventaCompleta = await traerVentaPorId(
                                  venta.idMovVenta
                                );
                                setVentaSeleccionada(ventaCompleta);
                                setModalType("editarVenta");
                                setTimeout(() => setShowModal(true), 0);
                              } catch (error) {
                                console.error("Error al cargar venta:", error);
                                alert("No se pudo cargar la venta para editar");
                              }
                            }}
                          >
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center",
                        color: "#999",
                        fontStyle: "italic",
                      }}
                    >
                      No hay ventas registradas. Haz clic en "AGREGAR" para
                      agregar una.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* TRANSPORTES */}
          <div className="tabla-seccion">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h5 style={{ color: "#0097B2", fontSize: "medium" }}>
                TRANSPORTE
              </h5>
              <button
                className="btnagregar"
                onClick={() => handleOpenModal("transporte")}
              >
                + AGREGAR
              </button>
            </div>

            <table className="tabla-gastos">
              <thead>
                <tr>
                  <th>Fecha de Salida</th>
                  <th>Transportista</th>
                  <th>Chofer</th>
                  <th>Dif TN</th>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th>Descargas TN.</th>
                  <th>Km</th>
                  <th>Precio por Km</th>
                  <th>Flete Total</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {operacionDetalle.movimientos.transportes.length > 0 ? (
                  operacionDetalle.movimientos.transportes.map((transporte) => (
                    <tr key={transporte.idMovTransporte} className="fila-tabla">
                      <td>{formatearFecha(transporte.FechaTransporte)}</td>
                      <td>{`${transporte.TransportistaNombre} ${transporte.TransportistaApellido}`}</td>
                      <td>{transporte.NombreChofer}</td>
                      <td>{diferenciaToneladas}</td>
                      <td>{transporte.Origen}</td>
                      <td>{transporte.Destino}</td>
                      <td>
                        {operacionDetalle.movimientos.ventas?.[0]
                          ?.ToneladasVendidas || 0}
                      </td>
                      <td>{transporte.Kilometros}</td>
                      <td>{formatearMoneda(transporte.PrecioXKm)}</td>
                      <td>
                        {formatearMoneda(
                          (operacionDetalle.movimientos.ventas?.[0]
                            ?.ToneladasVendidas || 0) * transporte.PrecioXKm
                        )}
                      </td>
                      <td>
                        <div className="td-acciones">
                          <button
                            className="btn-edit"
                            title="Editar transporte"
                            onClick={async () => {
                              try {
                                const transporteCompleto =
                                  await traerTransportePorId(
                                    transporte.idMovTransporte
                                  );
                                setTransporteSeleccionado(transporteCompleto);
                                setModalType("editarTransporte");
                                setTimeout(() => setShowModal(true), 0);
                              } catch (error) {
                                console.error(
                                  "Error al cargar transporte:",
                                  error
                                );
                                alert(
                                  "No se pudo cargar el transporte para editar"
                                );
                              }
                            }}
                          >
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      style={{
                        textAlign: "center",
                        color: "#999",
                        fontStyle: "italic",
                      }}
                    >
                      No hay transportes registrados. Haz clic en "AGREGAR" para
                      agregar uno.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* MODAL */}
          <ModalForm
            show={showModal}
            config={modalProps.config}
            onClose={() => {
              setShowModal(false);
              setCompraSeleccionada(null);
              setVentaSeleccionada(null);
              setTransporteSeleccionado(null);
            }}
            onSubmit={modalProps.onSubmit}
            datosIniciales={
              modalType === "editarCompra"
                ? compraSeleccionada
                : modalType === "editarVenta"
                ? ventaSeleccionada
                : modalType === "editarTransporte"
                ? transporteSeleccionado
                : {}
            }
          />
        </div>
      </div>
    </>
  );
};

export default OperacionDetalle;
