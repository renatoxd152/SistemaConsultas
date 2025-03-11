import React from "react";
import { Consulta } from "../../../app/models/consultas";
import { Layout } from "../../layout";
import { ConsultasForm } from "./form";

export const CadastroConsulta:React.FC = () =>
{
    const handleSubmit = (consulta:Consulta) =>
    {
        console.log("oi")
    }
    return(
        <Layout titulo="Consultas Médicas" tittleClassName="h1 display-6 fw-bold text-primary mt-4 text-center">
            <ConsultasForm onSubmit={handleSubmit}/>
        </Layout>
    )
}