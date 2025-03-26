import React, { useState } from "react";
import { Paciente } from "../../../app/models/pacientes";
import { usePacienteService } from "../../../app/services/pacientes.service";
import { Alert } from "../../common/mensagem";
import { Layout } from "../../layout";
import { PacienteForm } from "./form";

export const CadastroPaciente:React.FC=() =>
{
    const[mensagens,setMensagens] = useState<Array<Alert>>([])
    const service = usePacienteService()
    const handleSubmit = (paciente:Paciente) =>
    {
    
        service.salvar(paciente).then(response=>
        {
            setMensagens([{field:"alert alert-success",texto:"Paciente salvo com sucesso!"}])
        }).
        catch(error=>
        {
            setMensagens([{field:"alert alert-danger",texto:"Houve um erro ao salvar o paciente!"}])
        })
    }
    return(
        <Layout titulo="Cadastro de Pacientes" tittleClassName="h1 display-6 fw-bold text-primary mt-4" className="text-center" mensagens={mensagens}>
            <PacienteForm onSubmit={handleSubmit}/>
        </Layout>
    )
}