import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Libros from "./pages/Libros";
import FormularioLibro from "./pages/FormularioLibro";
import Encabezado from "./components/Encabezado";
import PiePagina from "./components/PiePagina";


function App() {
  return (
    <BrowserRouter> 
      <div className="container-md mt-5">
      <Encabezado />
      <Routes>
        <Route path="/" element={<Navigate to="/libros/lista" />} />
        <Route path="/libros/lista" element={<Libros />} />
        <Route path="/libros/nuevo" element={<FormularioLibro />} />
        <Route path="/libros/editar/:id" element={<FormularioLibro />} />
      </Routes>
      <PiePagina />
      </div>
    </BrowserRouter>
  );
}

export default App;
