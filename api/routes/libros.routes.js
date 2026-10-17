import express from "express";
import libroService from "../services/libroService.js";

const router = express.Router();

//Obtener todos
router.get("/", async (req, res) => {
    try {
        const { pagina, limite } = req.query; 
        const libros = await libroService.obtenerTodos({ pagina, limite });
        res.json(libros); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Crear libro
router.post("/", async (req, res) => {
    try {
        const nuevo = await libroService.crear(req.body); //En el req.body vienen los datos del formulario
        res.status(201).json(nuevo); // devuelve el objeto recién creado en formato JSON.
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Actualizar libro (segun su ID)
router.put("/:id", async (req, res) => {
    try {
        const libroActualizado = await libroService.actualizar(parseInt(req.params.id), req.body);
        res.json(libroActualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Eliminar libro (según su ID)
router.delete("/:id", async (req, res) => {
    try {
        await libroService.eliminar(parseInt(req.params.id));
        res.status(204).end();
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

// Filtrado
// Buscar con filtros
router.get("/filtrar", async (req, res) => {
    try {
        const resultados = await libroService.buscarFiltrado(req.query);
        res.json(resultados);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Contar libros filtrados
router.get("/filtrar/contar", async (req, res) => {
    try {
        const cantidad = await libroService.contarFiltrado(req.query);
        res.json({ cantidad });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Obtener libro por ID
router.get("/:id", async (req, res) => {
    try {
        const libro= await libroService.obtenerPorId(parseInt(req.params.id));
        if (!libro) return res.status(404).json({ error: "Libro no encontrado." });
        res.json(libro);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Contar todos
/*router.get("/contar", async (req, res) => {
    try {
        const cantidad = await libroService.contarTodos();
        res.json({ cantidad });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}); */

export default router;
