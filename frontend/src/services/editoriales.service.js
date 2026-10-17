import axios from "./axios.config.js";

const obtenerTodas = async () => {
    const response = await axios.get("/editoriales");
    return response.data;
};

export default {
    obtenerTodas
};
