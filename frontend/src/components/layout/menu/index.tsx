import React from "react";
import { Link } from "react-router-dom";
export const Menu:React.FC = () =>
{
    return(
        <aside>
            <ul className="navbar-nav bg-primary" data-bs-theme="dark">
                <Itens/>
            </ul>
        </aside>
    )
}

const rotas = [
    {
        label:"Médicos",
        children:[
            {
                label:'Cadastrar Médico',
                to:"/"
            },
            {
                label:'Listar médicos',
                to:"/listar"
            },
        ]
    },
    {
        label:"Consultas",
        children:[
            {
                label:"Cadastrar consultas",
                to:"/consultas/"
            },
            {
                label:"Listar Consultas",
                to:"/consultas/listar"
            }
        ]
    
    },
    {
        label:"Medicamentos",
        children:[
            {
                label:"Cadastrar Medicamentos",
                to:"/medicamentos"
            },
            {
                label:"Medicamentos cadastrados",
                to:"/medicamentos/listar"
            }
        ]
    }

]
const Itens: React.FC = () => {
    return (
        <nav className="nav justify-content-center">
            {rotas.map((rota, index) => (
                <li key={index} className="nav-item dropdown">
                    <a 
                        href="#" 
                        className="nav-link dropdown-toggle text-white" 
                        id={`dropdown${index}`} 
                        role="button" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        {rota.label}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby={`dropdown${index}`}>
                        {rota.children.map((child, childIndex) => (
                            <li key={childIndex}>
                                <Link to={child.to} className="dropdown-item">
                                    {child.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </nav>
    );
};
