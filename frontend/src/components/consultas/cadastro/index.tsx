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
        <Layout titulo="Consultas Médicas">
            <ConsultasForm onSubmit={handleSubmit}/>
        </Layout>
    )
}