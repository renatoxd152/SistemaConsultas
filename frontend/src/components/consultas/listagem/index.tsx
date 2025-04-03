import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { httpClient } from "../../../app/htpp";
import { Consulta } from "../../../app/models/consultas";
import { useConsultaService } from "../../../app/services/consultas.service";
import { Alert } from "../../common/mensagem";
import { Layout } from "../../layout";
import { TabelaConsultas } from "./tabela";
export const ListagemConsultas: React.FC = () =>
{
    const[consultas,setConsultas] = useState<Consulta[]>()
    const[mensagens,setMensagens] = useState<Array<Alert>>([])
    const{data:result} = useSWR<AxiosResponse<Consulta[]>>("/api/consultas",(url:string)=>httpClient.get(url))
    const service = useConsultaService();
    
    useEffect(()=>{
        setConsultas(result?.data || [])
    },[result])

    const deletar = (consulta:Consulta)=>
    {
        service.deletar(consulta.id).then(response=>
        {
            setConsultas(prevConsultas => prevConsultas?.filter(c => c.id !== consulta.id) || []);
            setMensagens([{field:"alert alert-success",texto:"Consulta deletada com sucesso!"}])
        })
        .catch(error=>
        {
            setMensagens([{field:"alert alert-danger",texto:"Houve um erro ao deletar a consulta!"}])
        })
    }
    
    return(
        <Layout titulo="Listagem de consultas" tittleClassName="h1 display-6 fw-bold text-primary mt-4" className="text-center" mensagens={mensagens}>
            <TabelaConsultas onDelete={deletar} consultas={consultas || [] }/>
        </Layout>
    )
}