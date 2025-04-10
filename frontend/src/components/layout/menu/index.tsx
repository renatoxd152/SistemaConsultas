import {
    faCalendarCheck,
    faChartBar,
    faFileAlt,
    faPills,
    faUserInjured,
    faUserMd
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import { Link } from "react-router-dom";

export const Menu: React.FC = () => {
    return (
        <aside className="bg-primary text-white vh-100" style={{ width: "250px", position: "fixed", top: 0, left: 0 }}>
            <div className="p-3">
                <h4 className="text-center mb-4">
                    <span className="fw-bold">Clínica Médica</span>
                </h4>
                <ul className="navbar-nav" data-bs-theme="dark">
                    <Itens />
                </ul>
                <div className="position-absolute bottom-0 start-0 end-0 p-3 text-center">
                    <small className="text-white-50">Sistema Clínica Médica v1.0</small>
                </div>
            </div>
        </aside>
    );
};

const rotas = [
    { label: "Médicos", to: "/medicos/listar", icon: faUserMd },
    { label: "Consultas", to: "/consultas/listar", icon: faCalendarCheck },
    { label: "Medicamentos", to: "/medicamentos/listar", icon: faPills },
    { label: "Pacientes", to: "/pacientes/listar", icon: faUserInjured },
    { label: "Relatório de Consultas", to: "/relatorios", icon: faFileAlt },
    { label: "Dashboard de Consultas", to: "/dashboards", icon: faChartBar },
];

const Itens: React.FC = () => {
    return (
        <nav className="nav flex-column">
            {rotas.map((rota, index) => (
                <li className="nav-item" key={index}>
                    <Link to={rota.to} className="nav-link text-white py-3 d-flex align-items-center">
                        <FontAwesomeIcon icon={rota.icon} className="me-3" style={{ width: "20px" }} />
                        {rota.label}
                    </Link>
                </li>
            ))}
        </nav>
    );
};