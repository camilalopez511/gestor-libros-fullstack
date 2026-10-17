import { NavLink } from 'react-router-dom';

export default function Encabezado() {
    return (
        <header className="bg-dark text-white py-3 mb-4">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-journal-bookmark-fill fs-3"></i>
                        <h1 className="h4 mb-0">Gestor de Libros y Editoriales</h1>
                    </div>
                    <div className="usuario-pill d-flex align-items-center gap-2">
                        <i className="bi bi-person-circle fs-4"></i>
                        <span>Camila Lopez</span>
                    </div>
                </div>

                <nav className="mt-4">
                    <ul className="nav nav-pills nav-fill gap-2 bg-primary p-2 rounded-5 shadow-sm justify-content-center">
                        <li className="nav-item">
                            <NavLink
                                to="/libros/lista"
                                className={({ isActive }) => `nav-link rounded-5 ${isActive ? 'bg-white text-primary fw-bold' : 'text-white'}`}
                            >
                                Libros
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/libros/nuevo"
                                className={({ isActive }) => `nav-link rounded-5 ${isActive ? 'bg-white text-primary fw-bold' : 'text-white'}`}
                            >
                                Nuevo Libro
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
