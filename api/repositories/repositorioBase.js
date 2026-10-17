export default class RepositorioBase {
    constructor(modelo) { //le paso un modelo de Sequelize
        this.modelo = modelo; 
    }

    async obtenerTodos({ pagina = 1, limite = 10 } = {}) { //Si no me dicen qué página ni cuántos resultados, traigo la primera página con 10 elementos
        const offset = (pagina - 1) * limite; //Calculo cuántos elementos tengo que saltar para llegar a la página deseada. desde qué posición empezar a recuperar datos.
        return this.modelo.findAll({ limit: limite, offset });
    }

    async obtenerPorId(id) {
        return this.modelo.findByPk(id);
    }

    async crear(datos) {
        return this.modelo.create(datos);
    }

    async actualizar(id, datos) {
        const instancia = await this.modelo.findByPk(id);
        if (!instancia) throw new Error(`Error: Instancia con id: ${id} no encontrada`);

        return instancia.update(datos);
    }

    async eliminar(id) {
        const instancia = await this.modelo.findByPk(id);
        if (!instancia) throw new Error(`Error: Instancia con id: ${id} no encontrada`);
        await instancia.destroy();
        return instancia;
    }

    //async contarTodos() {
        //return this.modelo.count();
    //}
}

