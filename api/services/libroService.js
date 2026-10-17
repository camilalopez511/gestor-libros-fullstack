import libroRepository from "../repositories/libroRepository.js";
import editorialRepository from "../repositories/editorialRepository.js";

class LibroService { 
    async obtenerTodos({ pagina = 1, limite = 10 } = {}) {
        return await libroRepository.obtenerTodos({ pagina, limite }); 
    }

    async obtenerPorId(id) {
        return await libroRepository.obtenerPorId(id);
    }

    async crear(datos) {
        await this.#validarISBN(datos.isbn);
        await this.#validarAnio(datos.anioPublicacion);
        await this.#validarPuntuacion(datos.puntuacion);
        await this.#validarCopiasVendidas(datos.copiasVendidas);
        return await libroRepository.crear(datos);
    }

    async actualizar(id, datos) {
        await this.#validarISBN(datos.isbn, id);
        await this.#validarAnio(datos.anioPublicacion);
        await this.#validarPuntuacion(datos.puntuacion);
        await this.#validarCopiasVendidas(datos.copiasVendidas);
        return await libroRepository.actualizar(id, datos);
    }

    async eliminar(id) {
        return await libroRepository.eliminar(id);
    }

    async buscarFiltrado(filtros) {
        return await libroRepository.buscarFiltrado(filtros);
    }

    async contarFiltrado(filtros) {
        return await libroRepository.contarFiltrado(filtros);
    }

    //async contarTodos() {
        //return await libroRepository.contarTodos();
    //}

    // 🧪 Validaciones
    async #validarISBN(isbn, idActual = null) {
        // Quitar guiones y espacios
        const limpio = String(isbn).replace(/[-\s]/g, '');
        // Validar formato ISBN-13
        if (limpio.length !== 13) {
            throw new Error('El ISBN debe tener 13 dígitos numéricos.');
        }
        // Validar código verificador ISBN-13
        let sum = 0;
        for (let i = 0; i < 12; i++) {
            const digit = parseInt(limpio[i], 10);
            sum += (i % 2 === 0) ? digit : digit * 3; //Si es par, suma el dígito; si es impar, suma el dígito multiplicado por 3
        }
        const checkDigit = (10 - (sum % 10)) % 10;
        if (checkDigit !== parseInt(limpio[12], 10)) {
            throw new Error('El ISBN no es válido según el código verificador.');
        }
        // Validar que no se repita en la base de datos (excepto si es el mismo libro)
        const existente = await libroRepository.buscarPorISBN(limpio);
        if (existente && (!idActual || existente.id !== idActual)) {
            throw new Error(`Ya existe un libro con el ISBN "${isbn}".`);
        }
    }

    async #validarAnio(anio) {
        const anioActual = new Date().getFullYear();
        if (anio < 1900 || anio > anioActual) {
            throw new Error(`El año de publicación debe estar entre 1900 y ${anioActual}.`);
        }
    }

    async #validarPuntuacion(puntuacion) {
        if (typeof puntuacion !== "number" || isNaN(puntuacion)) {
            throw new Error("La puntuación debe ser un número.");
        }
        if (puntuacion < 0 || puntuacion > 100) {
            throw new Error("La puntuación debe estar entre 0 y 100.");
        }
    }

    async #validarCopiasVendidas(copiasVendidas) {
        if (!Number.isInteger(copiasVendidas) || copiasVendidas < 0) {
            throw new Error("Las copias vendidas deben ser un número entero mayor o igual a 0.");
        }
    }

}

export default new LibroService();
