import RepositorioBase from "./repositorioBase.js";
import Libro from "../models/libro.js";
import Editorial from "../models/editorial.js";
import { Op } from "sequelize";

class LibroRepository extends RepositorioBase {  // Hereda de RepositorioBase
    constructor() {
        super(Libro); 
    }

    async obtenerTodos({ pagina = 1, limite = 10 } = {}) {
        const offset = (pagina - 1) * limite;
        return this.modelo.findAll({
            limit: limite,
            offset,
            include: { 
                model: Editorial,   //"Cuando traigas libros, también traé la información de la editorial asociada a cada uno (mediante la relación definida antes)."
                as: "editorial"
            },
            order: [["anioPublicacion", "DESC"]]
        });
    }

    async obtenerPorId(id) {
        return this.modelo.findByPk(id, {
        include: {
            model: Editorial,
            as: "editorial"
        }
        });
    }

    async buscarPorISBN(isbn) {
    const limpio = String(isbn).replace(/[-\s]/g, ''); 
    return this.modelo.findOne({
        where: {
            isbn: { [Op.eq]: limpio }
        },
    });
}

    

    /* async getUltimosEstrenos() {
        return this.modelo.findAll({
        order: [["fechaEstreno", "DESC"]],
        limit: 10,
        include: { model: Plataforma, as: "plataforma" }
        });
    }

    async getMasPopulares() {
        return this.modelo.findAll({
        where: {
            opiniones: { [Op.gt]: 500 }
        },
        order: [["valoracion", "DESC"]],
        limit: 10,
        include: { model: Plataforma, as: "plataforma" }
        });
    } */

    async buscarFiltrado({ texto, idEditorial, puntajeMinimo, copiasMinimas } = {}) {
        const condiciones = [];

        if (texto) {
            const likeTexto = { [Op.like]: `%${texto}%` };
            condiciones.push({
                [Op.or]: [
                    { titulo: likeTexto },
                    { autor: likeTexto },
                    { genero: likeTexto }
                ]
            });
        }

        if (idEditorial) {
            condiciones.push({ idEditorial });
        }

        if (typeof puntajeMinimo === "number") {
            condiciones.push({ puntuacion: { [Op.gte]: puntajeMinimo } });
        }

        if (typeof copiasMinimas === "number") {
            condiciones.push({ copiasVendidas: { [Op.gte]: copiasMinimas } });
        }

        return this.modelo.findAll({
            where: { [Op.and]: condiciones },
            include: { model: Editorial, as: "editorial" },
            order: [["anioPublicacion", "DESC"]],
            limit: 25
        });
    }

    async contarFiltrado({ texto, idEditorial, puntajeMinimo, copiasMinimas } = {}) {
        const condiciones = [];

        if (texto) {
            const likeTexto = { [Op.like]: `%${texto}%` };
            condiciones.push({
                [Op.or]: [
                    { titulo: likeTexto },
                    { autor: likeTexto },
                    { genero: likeTexto }
                ]
            });
        }

        if (idEditorial) {
            condiciones.push({ idEditorial });
        }

        if (typeof puntajeMinimo === "number") {
            condiciones.push({ puntuacion: { [Op.gte]: puntajeMinimo } });
        }

        if (typeof copiasMinimas === "number") {
            condiciones.push({ copiasVendidas: { [Op.gte]: copiasMinimas } });
        }

        return this.modelo.count({
            where: { [Op.and]: condiciones }
        });
    }

    
    //async contarTodos() {
        //return this.modelo.count();
    //}
}

export default new LibroRepository();
