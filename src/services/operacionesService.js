import axios from "axios";
import { API_URL } from "../api/apiConfig";

// 🔹 Usar la API_URL tal como está (con / al final)
const OPERACIONES_URL = `${API_URL}api/operaciones/v1`; // Sin / adicional

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