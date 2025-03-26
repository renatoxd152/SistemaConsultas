import React from "react";
import { Administrador } from "../../app/models/administrador";
import { LayoutTelaInicial } from "../layout/cadastro";
import { CadastroAdministrador } from "./form";

export const Cadastro:React.FC = () =>
{
    const handleSubmit = (administrador:Administrador) =>
    {
        console.log(administrador)
    }
    return(
        <LayoutTelaInicial titulo="Cadastro de Administrador" tittleClassName="h1 display-6 fw-bold text-primary mt-4 text-center" styleDiv={{ backgroundColor: '#f0f8ff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CadastroAdministrador onSubmit={handleSubmit}/>
        </LayoutTelaInicial>
    )
}