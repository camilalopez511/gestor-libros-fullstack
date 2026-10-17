import RepositorioBase from "./repositorioBase.js";
import Editorial from "../models/editorial.js";

class EditorialRepository extends RepositorioBase {
    constructor() {
        super(Editorial); // Le paso el modelo Editorial a la clase base
    }

    async obtenerTodos() {
        return this.modelo.findAll({
            order: [["NOMBRE", "ASC"]]
        });
    }
    }

export default new EditorialRepository();