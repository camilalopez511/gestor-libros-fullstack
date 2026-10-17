import express from "express";
import editorialService from "../services/editorialService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const editoriales = await editorialService.obtenerTodas();
        res.json(editoriales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

