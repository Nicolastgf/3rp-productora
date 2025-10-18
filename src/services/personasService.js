import axios from "axios";
import { API_URL } from "../api/apiConfig";
import { useAuthStore } from "../store/useAuthStore";
import api from "../api/axiosConfig";

const PERSONAS_URL = `${API_URL}api/personas/v1`;

// 🔹 Crear persona
export const crearPersona = async (data) => {
    const response = await api.post("/personas/v1/crear", data);
    return response.data;
};

// 🔹 Traer todas las personas
export const traerPersonas = async () => {
    const { token } = useAuthStore.getState();
    const response = await axios.get(PERSONAS_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// 🔹 Traer personas activas por tipo
export const traerPersonasPorTipo = async (tipo) => {
    const tipoConfigurado = tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();
    const { token } = useAuthStore.getState();
    const response = await axios.get(`${PERSONAS_URL}/${tipoConfigurado}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// 🔹 Actualizar persona
export const actualizarPersona = async (idPersona, data) => {
    const { token } = useAuthStore.getState();
    const response = await axios.put(`${PERSONAS_URL}/actualizar/${idPersona}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};