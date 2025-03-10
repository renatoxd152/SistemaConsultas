import React from "react";
import { Link } from "react-router-dom";

export const Menu:React.FC = () =>
{
    return(
        <aside>
            <ul>
                <Itens/>
            </ul>
        </aside>
    )
}

const rotas = [
    {
        label:'Cadastrar Médico',
        to:"/"
    },
    {
        label:'Listar médicos',
        to:"/listar"
    },
    {
        label:"Consultas",
        to:"/consultas"
    }
]
const Itens:React.FC=()=>
{
    return(
        <nav className="nav justify-content-center">
            {
                rotas.map((rota,index)=>(
                    <li key={index}>
                        <Link to={rota.to} className="nav-link">{rota.label}</Link>
                    </li>
                ))
            }
        </nav>
    )
}

