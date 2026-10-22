import axios from "axios";

const API_URL = "http://localhost:8000/api/restaurante";

export const fetchRestaurante = async () => {
    const respuesta = await axios.get(`${API_URL}/`);
    return respuesta.data;
};

export const createRestaurante = async (restaurante) => {
    const respuesta = await axios.post(`${API_URL}/`, restaurante);
    return respuesta.data;
};

export const updateRestaurante = async (id, restaurante) => {
    const respuesta = await axios.put(`${API_URL}/${id}`, restaurante);
    return respuesta.data;
};

export const deleteRestaurante = async (id) => {
    const respuesta = await axios.delete(`${API_URL}/${id}`);
    return respuesta.data;
};

export const fetchRestauranteById = async (id) => {
    const respuesta = await axios.get(`${API_URL}/${id}`);
    return respuesta.data;
};
