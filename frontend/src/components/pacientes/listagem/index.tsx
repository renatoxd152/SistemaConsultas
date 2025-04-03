import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { httpClient } from "../../../app/htpp";
import { Paciente } from "../../../app/models/pacientes";
import { usePacienteService } from "../../../app/services/pacientes.service";
import { Alert } from "../../common/mensagem";
import { Layout } from "../../layout";
import { TabelaPacientes } from "./tabela";

export const ListagemPacientes:React.FC= () =>
{
    const[pacientes,setPacientes] = useState<Paciente[]>()
    const[mensagens,setMensagens] = useState<Array<Alert>>([])
    const{data:result} = useSWR<AxiosResponse<Paciente[]>>("/api/pacientes",(url:string)=>httpClient.get(url))
    const service = usePacienteService();
    useEffect(()=>{
        setPacientes(result?.data || [])
    },[result])
    

    const deletar = (paciente:Paciente)=>
    {
        console.log(paciente.id)
        service.deletar(paciente.id).then(response=>
        {
          
            setPacientes(prevPacientes => prevPacientes?.filter(p => p.id !== paciente.id) || []);
            setMensagens([{field:"alert alert-success",texto:"Paciente deletado com sucesso!"}])
        })
        .catch(error=>
        {
            console.log("erro pacientes",error)
            setMensagens([{field:"alert alert-danger",texto:"Houve um erro ao deletar a consulta!"}])
        })
    }
    
    return(
        <Layout titulo="Listagem de Pacientes" tittleClassName="h1 display-6 fw-bold text-primary mt-4" className="text-center" mensagens={mensagens}>
            <TabelaPacientes onDelete={deletar} pacientes={pacientes || []}/>
        </Layout>
    )
}