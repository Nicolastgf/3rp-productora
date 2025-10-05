import axios from "axios";
import { API_URL } from "../api/apiConfig";

const PERSONAS_URL = `${API_URL}api/personas/v1`;

// 🔹 Crear persona
export const crearPersona = async (data) => {
    const response = await axios.post(`${PERSONAS_URL}/crear`, data);
    return response.data;
};

// 🔹 Traer todas las personas
export const traerPersonas = async () => {
    const response = await axios.get(PERSONAS_URL);
    return response.data;
};

// Traer personas activas por tipo
export const traerPersonasPorTipo = async (tipo) => {
    const tipoConfigurado = tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();
    const response = await axios.get(`${PERSONAS_URL}/${tipoConfigurado}`);
    return response.data;
};