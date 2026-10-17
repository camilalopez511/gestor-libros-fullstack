import axios from "./axios.config.js";

const obtenerTodos = async () => {
    const response = await axios.get("/libros");
    return response.data;
};

const obtenerPorId = async (id) => {
    const response = await axios.get(`/libros/${id}`);
    return response.data;
};

const crear = async (libro) => {
    const response = await axios.post("/libros", libro);
    return response.data;
};

const actualizar = async (id, libro) => {
    const response = await axios.put(`/libros/${id}`, libro);
    return response.data;
};

const eliminar = async (id) => {
    await axios.delete(`/libros/${id}`);
};

const buscarFiltrado = async (filtros) => {
    const params = new URLSearchParams(filtros).toString(); //Convierte los filtros a parámetros de URL
    const response = await axios.get(`/libros/filtrar?${params}`); //Hace una petición HTTP GET al backend
    return response.data;
};

/*
const contarFiltrado = async (filtros) => {
    const params = new URLSearchParams(filtros).toString();
    const response = await axios.get(`/libros/filtrar/contar?${params}`);
    return response.data.cantidad;
};

const contarTodos = async () => {
    const response = await axios.get("/libros/contar");
    return response.data.cantidad;
};
*/

export default {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    buscarFiltrado
};
