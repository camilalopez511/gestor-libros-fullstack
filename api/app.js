import express from 'express';
import sequelize from './db.js';
import cors from "cors";
import logger from "./middlewares/logger.js";

import librosRouter from "./routes/libros.routes.js";
import editorialesRouter from "./routes/editoriales.routes.js";

const app = express();
const PORT = 3000;

// #region Middlewares
// Permite que el backend acepte peticiones desde otro origen (el frontend)
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"], //Define qué métodos HTTP están permitidos.
  credentials: true //Permite el envío de cookies
}));

app
  .use(express.json()) //permite que Express entienda datos en formato JSON
  .use(express.urlencoded({ extended: true })); //permite que Express entienda datos enviados desde formularios HTML

app.use(logger);
// #endregion

// Ruta principal de servidor
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Servidor Express</title>
        <style>
          body { background-color: #f2f2f2; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; }
          .container { background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 0 12px rgba(0,0,0,0.1); text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Servidor Express Activo</h1>
          <p>API corriendo en <strong>http://localhost:3000</strong></p>
        </div>
      </body>
    </html>
  `);
});

// #region Routers
app
  .use("/api/libros", librosRouter)
  .use("/api/editoriales", editorialesRouter);
// #endregion

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

(async function start() {
    try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos establecida.");
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:\n", error);
    process.exit(1);
  }

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
    });
}());
