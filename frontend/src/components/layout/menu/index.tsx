import {
    faBars,
    faCalendarCheck,
    faChartBar,
    faFileAlt,
    faPills,
    faUserInjured,
    faUserMd
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.css";

export const Menu: React.FC = () => {
    return (
        <>
            <button className="btn btn-primary d-lg-none m-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu">
                <FontAwesomeIcon icon={faBars} className="me-2" />
                Menu
            </button>

            <aside className="bg-primary text-white vh-100 d-none d-lg-block sidebar">
                <div className="p-3 d-flex flex-column h-100">
                    <div className="text-center mb-4 pt-3">
                        <h4 className="fw-bold mb-0">Clínica Médica</h4>
                        <small className="text-white-50">Gestão de Saúde Integrada</small>
                    </div>
                    
                    <ul className="navbar-nav flex-grow-1" data-bs-theme="dark">
                        <Itens />
                    </ul>
                    
                    <div className="text-center p-3 mt-auto">
                        <div className="sidebar-divider mb-3"></div>
                        <small className="text-white-50">Sistema Clínica v1.0</small>
                    </div>
                </div>
            </aside>

            {/* Offcanvas Mobile */}
            <div className="offcanvas offcanvas-start bg-primary text-white" tabIndex={-1} id="offcanvasMenu">
                <div className="offcanvas-header border-bottom border-white-10">
                    <h5 className="offcanvas-title fw-bold">Clínica Médica</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
                </div>
                <div className="offcanvas-body p-0">
                    <ul className="navbar-nav">
                        <Itens />
                    </ul>
                </div>
                <div className="offcanvas-footer p-3 border-top border-white-10 text-center">
                    <small className="text-white-50">Sistema Clínica v1.0</small>
                </div>
            </div>
        </>
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
    const location = useLocation();
    
    return (
        <nav className="nav flex-column">
            {rotas.map((rota, index) => (
                <li className="nav-item" key={index}>
                    <Link 
                        to={rota.to} 
                        className={`nav-link py-3 px-4 d-flex align-items-center transition-all ${
                            location.pathname === rota.to 
                                ? 'active fw-bold bg-white text-primary' 
                                : 'text-white hover-bg-white-10'
                        }`}
                    >
                        <FontAwesomeIcon 
                            icon={rota.icon} 
                            className="me-3" 
                            style={{ width: "20px", opacity: location.pathname === rota.to ? 1 : 0.8 }} 
                        />
                        {rota.label}
                        {location.pathname === rota.to && (
                            <span className="active-indicator ms-auto"></span>
                        )}
                    </Link>
                </li>
            ))}
        </nav>
    );
};