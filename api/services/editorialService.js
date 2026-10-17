import editorialRepository from "../repositories/editorialRepository.js";

class EditorialService {
    async obtenerTodas() {
        return await editorialRepository.obtenerTodos();
    }
}

export default new EditorialService();
