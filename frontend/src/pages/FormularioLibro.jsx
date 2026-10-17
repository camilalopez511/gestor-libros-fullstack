import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"; // corregido el import
import editorialesService from "../services/editoriales.service";
import librosService from "../services/libros.service";

const FormularioLibro = () => {
  const [editoriales, setEditoriales] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();

  useEffect(() => {
    editorialesService.obtenerTodas().then(setEditoriales);

    if (id) {
      librosService.obtenerPorId(id).then((libro) => {
        reset(libro); // Rellena el formulario con los datos del libro
      });
    }
  }, [id, reset]); // El efecto depende de ellos, se ejecuta cada vez que cambian.

  const onSubmit = async (data) => {
    // Aseguramos que los campos numéricos lleguen como número
    data.idEditorial = Number(data.idEditorial);
    data.anioPublicacion = Number(data.anioPublicacion);
    data.puntuacion = Number(data.puntuacion);
    data.copiasVendidas = Number(data.copiasVendidas);

    try {
      if (id) {
        await librosService.actualizar(id, data);
      } else {
        await librosService.crear(data);
      }
      navigate("/libros/lista");
    } catch (error) {
      const mensaje = error?.response?.data?.error;

      if (mensaje?.toLowerCase().includes("isbn")) {
        setError("isbn", { type: "manual", message: mensaje });
      } else if (mensaje?.toLowerCase().includes("año")) {
        setError("anioPublicacion", { type: "manual", message: mensaje });
      } else if (mensaje?.toLowerCase().includes("puntua")) {
        setError("puntuacion", { type: "manual", message: mensaje });
      } else if (mensaje?.toLowerCase().includes("copias")) {
        setError("copiasVendidas", { type: "manual", message: mensaje });
      } else {
        alert(mensaje || "Error al guardar el libro.");
      }
    }
  };


  return (
    <main className="container mt-5">
      <h3 className="mb-4">{id ? "Editar Libro" : "Nuevo Libro"}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label>Título:</label>
          <input {...register("titulo", { required: true })} className="form-control" />
          {errors.titulo && <span className="text-danger">Campo obligatorio</span>}
        </div>

        <div className="col-md-6">
          <label>Autor:</label>
          <input {...register("autor", { required: true })} className="form-control" /> 
          {errors.autor && <span className="text-danger">Campo obligatorio</span>}
        </div>

        <div className="col-md-6">
          <label>Año de Publicación:</label>
          <input
            type="number"
            {...register("anioPublicacion", {
              required: true,
              min: 1900,
              max: new Date().getFullYear(),
            })}
            className="form-control"
          />
          {errors.anioPublicacion && <span className="text-danger">El año debe estar entre 1900 y el actual.</span>}
        </div>

        <div className="col-md-6">
          <label>Género:</label>
          <input {...register("genero", { required: true })} className="form-control" />
          {errors.genero && <span className="text-danger">Campo obligatorio</span>}
        </div>

        <div className="col-md-6">
          <label>Editorial:</label>
          <select {...register("idEditorial", { required: true })} className="form-select">
            <option value="">Seleccione una editorial</option>
            {editoriales.map((e) => (
              <option key={e.id} value={e.id}>{e.nombre}</option>
            ))}
          </select>
          {errors.idEditorial && <span className="text-danger">Seleccione una editorial</span>}
        </div>

        <div className="col-md-6">
          <label>ISBN:</label>
          <input {...register("isbn", { required: true })} className="form-control" />
            {errors.isbn && <span className="text-danger">{errors.isbn.message || "Campo obligatorio"}</span>}
        </div>

        <div className="col-md-6">
          <label>Puntuación (0 a 100):</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="100"
            {...register("puntuacion", {
              required: true,
              min: 0,
              max: 100,
              valueAsNumber: true, // Asegura que se maneje como número
            })}
            className="form-control"
          />
          {errors.puntuacion && (
            <span className="text-danger">Debe ser un número entre 0 y 100.</span>
          )}
        </div>

        <div className="col-md-6">
          <label>Copias vendidas:</label>
          <input
            type="number"
            min="0"
            {...register("copiasVendidas", {
              required: true,
              min: 0,
              valueAsNumber: true,
            })}
            className="form-control"
          />
          {errors.copiasVendidas && (
            <span className="text-danger">Debe ser un número mayor o igual a 0.</span>
          )}
        </div>


        <div className="col-12">
          <button type="submit" className="btn btn-success">Guardar</button>
        </div>
      </form>
    </main>
  );
};

export default FormularioLibro;
