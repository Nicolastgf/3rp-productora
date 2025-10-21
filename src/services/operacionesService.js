import axios from "axios";
import { API_URL } from "../api/apiConfig";

// 🔹 Usar la API_URL tal como está (con / al final)
const OPERACIONES_URL = `${API_URL}api/operaciones/v1`; 
const COMPRAS_URL = `${API_URL}api/compras/v1`; 
const PRODUCTOS_URL = `${API_URL}api/productos/v1`;
const VENTAS_URL = `${API_URL}api/ventas/v1`;
const TRANSPORTE_URL =  `${API_URL}api/transportes/v1`

// 🔹 Traer operaciones filtradas por mes y año
export const traerOperacionesFiltradas = async (mes, anio) => {
    try {
        console.log(`URL completa: ${OPERACIONES_URL}/filtradas`);
        const response = await axios.get(`${OPERACIONES_URL}/filtradas`, {
            params: { mes, anio }
        });
        return response.data;
    } catch (error) {
        console.error("Error en traerOperacionesFiltradas:", error);
        console.error("URL intentada:", `${OPERACIONES_URL}/filtradas`);
        throw error;
    }
};

//  Traer operación completa por ID (con todos sus movimientos)
export const traerOperacionCompleta = async (idOperacion) => {
    const response = await axios.get(`${OPERACIONES_URL}/${idOperacion}/completa`);
    return response.data;
};

// Traer todas las operaciones
export const traerOperaciones = async () => {
    const response = await axios.get(OPERACIONES_URL);
    return response.data;
};

// Crear operación
export const crearOperacion = async (data) => {
    const response = await axios.post(`${OPERACIONES_URL}/crear`, data);
    return response.data;
};

//crear compra
export const crearCompra = async (data) => {
    const response = await axios.post(`${COMPRAS_URL}/crear`, data);
    return response.data;
}

export const editarCompra = async(data,idMovCompra) =>{
    const response = await axios.put(`${COMPRAS_URL}/actualizar/${idMovCompra}`, data)
    return response.data;
}

export const traerCompraPorId = async (idMovCompra) => {
  const response = await axios.get(`${COMPRAS_URL}/buscar/${idMovCompra}`);
  return response.data;
};
 
export const obtenerProductosActivos = async () => {
    const response = await axios.get(`${PRODUCTOS_URL}/activos`);
    return response.data;
};

export const obtenerProductosActivosPorId = async (idProducto) => {
    const response = await axios.get(`${PRODUCTOS_URL}/activos/${idProducto}`);
    return response.data;
}

export const crearVenta = async (data) => {
    const response = await axios.post(`${VENTAS_URL}/crear`, data);
    return response.data;
}

export const editarVenta = async (data, idMovVenta) =>{
    const response = await axios.put(`${VENTAS_URL}/actualizar/${idMovVenta}`, data)
    return response.data;
}

export const traerVentaPorId = async(idMovVenta)=>{
  const response = await axios.get(`${VENTAS_URL}/buscar/${idMovVenta}`);
  return response.data;

}
export const crearTransportes = async (data) =>{
    const response = await axios.post(`${TRANSPORTE_URL}/crear`, data);
    return response.data;
}

export const editarTransporte = async (data, idMovTransporte)=>{
const response = await axios.put(`${TRANSPORTE_URL}/actualizar/${idMovTransporte}`, data)
    return response.data;
}

export const traerTransportePorId = async (idMovTransporte)=>{
const response = await axios.get(`${TRANSPORTE_URL}/buscar/${idMovTransporte}`);
  return response.data;
}