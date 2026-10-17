# 📚 Sistema de Gestión de Libros y Editoriales

Aplicación web Full Stack (Single Page Application) diseñada para la administración, consulta y filtrado de un catálogo de libros y sus respectivas editoriales. Proyecto desarrollado en el marco de la asignatura **Desarrollo de Software** de la carrera Ingeniería en Sistemas de Información (UTN - Facultad Regional Córdoba).

---

## 🚀 Características Principales

* **Operaciones CRUD Completas:** Creación, lectura, actualización y eliminación de libros, integrados mediante una relación `1 a N` con el catálogo de editoriales.
* **Búsqueda y Filtrado Multicriterio:** Búsqueda combinada en tiempo real por texto (título, autor o género), selección de editorial, puntaje mínimo y cantidad mínima de copias vendidas.
* **Validaciones de Negocio y Formularios:**
  * **Front-end:** Validación reactiva de campos obligatorios, rangos numéricos y formatos mediante `React Hook Form`.
  * **Back-end:** Verificación algorítmica de formato y dígito verificador para códigos **ISBN-13**, control de duplicados en base de datos y validación de años de publicación.
* **Interfaz de Usuario (UI/UX) Enriquecida:**
  * Indicadores visuales dinámicos (trofeo de *Best Seller* para obras que superan las 500.000 copias vendidas).
  * Renderizado dinámico de banderas según el país de origen de la editorial y conversión de puntajes numéricos a escala de estrellas.

---

## 🛠️ Tecnologías Utilizadas

### Front-end
* **React 19** (con **Vite** como empaquetador)
* **React Router DOM** (Navegación SPA)
* **React Hook Form** (Manejo y validación de formularios)
* **Axios** (Consumo de API REST)
* **Bootstrap 5.3** & **FontAwesome / Bootstrap Icons** (Estilos y diseño responsivo)

### Back-end & Base de Datos
* **Node.js** & **Express** (Servidor y construcción de API RESTful)
* **Sequelize ORM** (Modelado de datos y consultas)
* **SQLite3** (Persistencia en base de datos relacional)
* **CORS** & Middlewares personalizados (Logger de peticiones HTTP y formateo de consultas SQL)

---

## 🏗️ Arquitectura del Proyecto

El proyecto está dividido en dos módulos independientes (`frontend` y `api`), aplicando separación de responsabilidades y arquitectura en capas en el servidor:

```text
gestor-libros-fullstack/
├── api/                          # Servidor Back-end (Node.js + Express)
│   ├── data/                     # Base de datos SQLite (dbLibros.sqlite)
│   ├── middlewares/              # Logger de actividad HTTP
│   ├── models/                   # Modelos Sequelize (Libro, Editorial) y asociaciones
│   ├── repositories/             # Capa de acceso a datos (Patrón Repository + RepositorioBase)
│   ├── routes/                   # Definición de endpoints REST (/api/libros, /api/editoriales)
│   ├── services/                 # Lógica de negocio y validaciones (ej. cálculo ISBN-13)
│   ├── app.js                    # Configuración de Express y middlewares
│   └── db.js                     # Conexión e instancia de Sequelize
│
└── frontend/                     # Cliente Front-end (React + Vite)
    └── src/
        ├── components/           # Componentes reutilizables (Encabezado, PiePagina)
        ├── pages/                # Vistas principales (Libros, FormularioLibro)
        ├── services/             # Configuración de Axios y servicios de llamadas a la API
        └── App.jsx               # Configuración de rutas
```

---

## ⚙️ Instalación y Ejecución Local

Para correr este proyecto en tu entorno local, asegurate de tener instalado [Node.js](https://nodejs.org/).

### 1. Clonar el repositorio
```bash
git clone [https://github.com/camilalopez511/gestor-libros-fullstack.git](https://github.com/camilalopez511/gestor-libros-fullstack.git)
cd gestor-libros-fullstack
```

### 2. Configurar e iniciar el Back-end (API)
Abrí una terminal y ejecutá:
```bash
cd api
npm install
npm run dev
```
*El servidor comenzará a escuchar en `http://localhost:3000` y se conectará automáticamente a la base de datos SQLite.*

### 3. Configurar e iniciar el Front-end
Abrí una **segunda terminal** y ejecutá:
```bash
cd frontend
npm install
npm run dev
```
*La aplicación web estará disponible en tu navegador en `http://localhost:5173`.*

---

## ✒️ Autora

* **Camila Belén López Pérez** - *Estudiante de Ingeniería en Sistemas de Información (UTN FRC)*
  * [LinkedIn](https://www.linkedin.com/in/camilabelenlopezperez)
  * [GitHub](https://github.com/camilalopez511)