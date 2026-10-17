import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import librosService from "../services/libros.service";
import editorialesService from "../services/editoriales.service";

const Libros = () => {
    const [libros, setLibros] = useState([]);  
    const [editoriales, setEditoriales] = useState([]);
    const [filtros, setFiltros] = useState({
        texto: "",
        idEditorial: "",
        puntajeMinimo: "",
        copiasMinimas: "",
    });

    const navigate = useNavigate(); // Permite navegar a otras rutas

    const cargarRecientes = async () => {
        const data = await librosService.obtenerTodos(); // ya viene ordenado por año
        setLibros(data); 
    };

    const cargarEditoriales = async () => {
        const data = await editorialesService.obtenerTodas();
        setEditoriales(data); //Actualiza el estado y vuelve a renderizar el componente
    }; 

    const buscar = async () => {
      const filtrosConvertidos = {
        ...filtros,
        puntajeMinimo: filtros.puntajeMinimo !== "" ? Number(filtros.puntajeMinimo) : undefined,
        copiasMinimas: filtros.copiasMinimas !== "" ? Number(filtros.copiasMinimas) : undefined,
      };
      const data = await librosService.buscarFiltrado(filtrosConvertidos);
      setLibros(data);
    };

    const limpiarFiltros = () => {
        setFiltros({ texto: "", idEditorial: "", puntajeMinimo: "", copiasMinimas: "" });
        cargarRecientes(); // Vuelve a cargar los libros sin filtros
    };

    const eliminar = async (id) => {
        if (confirm("¿Seguro que desea eliminar este libro?")) {
            await librosService.eliminar(id);
            buscar();
        }
    };

    useEffect(() => {
        cargarEditoriales();
        cargarRecientes();
    }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Listado de Libros</h2>
      <form className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por titulo, autor o género"
            value={filtros.texto}
            onChange={(e) => setFiltros({ ...filtros, texto: e.target.value })} 
          />
        </div>
        <div className="col-md-4">
            <select
                className="form-select"
                value={filtros.idEditorial}
                onChange={(e) => setFiltros({ ...filtros, idEditorial: e.target.value })}
            >
                <option value="">Todas las editoriales</option>
                {editoriales.map((editorial) => (
                <option key={editorial.id} value={editorial.id}>
                    {editorial.nombre}
                </option>
                ))}
            </select>
        </div>
        
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Puntaje mínimo (0 a 100)"
            value={filtros.puntajeMinimo}
            onChange={(e) =>
              setFiltros({ ...filtros, puntajeMinimo: e.target.value })
            }
            min="0"
            max="100"
          />
        </div>

        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Copias mínimas vendidas"
            value={filtros.copiasMinimas}
            onChange={(e) =>
              setFiltros({ ...filtros, copiasMinimas: e.target.value })
            }
            min="0"
          />
        </div>

        
        <div className="col-md-4 d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-primary" onClick={buscar}>Filtrar</button>
          <button type="button" className="btn btn-secondary" onClick={limpiarFiltros}>Limpiar</button>
        </div>
      </form>

      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Año Publicacion</th>
            <th>Genero</th>
            <th>Editorial</th>
            <th>ISBN</th>
            <th>Puntuación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => {
            const codigosPaises = {
              "Argentina": "ar",
              "España": "es",
              "Estados Unidos": "us",
              "Francia": "fr",
              "Reino Unido": "gb",
              "Alemania": "de",
              "Italia": "it",
              "Brasil": "br",
              "México": "mx",
              "Japón": "jp",
            };
            const renderizarEstrellas = (puntuacion) => {
              const valor = Number(puntuacion);

              if (valor >= 80) return "⭐⭐⭐⭐⭐";
              if (valor >= 60) return "⭐⭐⭐⭐";
              if (valor >= 40) return "⭐⭐⭐";
              if (valor >= 20) return "⭐⭐";
              return "⭐";
            };

            return (
              <tr key={libro.id}>
                <td>
                  {libro.copiasVendidas > 500000 && (
                    <i className="fas fa-trophy text-warning me-1" title="Best Seller"></i>
                  )}
                  {libro.titulo}
                </td>
                <td>{libro.autor}</td>
                <td>{libro.anioPublicacion}</td>
                <td>{libro.genero}</td>
                <td>
                  {libro.editorial?.pais && (
                    <img
                      src={`https://flagcdn.com/16x12/${codigosPaises[libro.editorial.pais]}.png`}
                      alt={libro.editorial.pais}
                      style={{ marginRight: "5px" }}
                    />
                  )}
                  {libro.editorial?.nombre}
                </td>
                <td>{libro.isbn}</td>
                <td>{renderizarEstrellas(libro.puntuacion)}</td>
                <td className="text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate(`/libros/editar/${libro.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => eliminar(libro.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Libros;