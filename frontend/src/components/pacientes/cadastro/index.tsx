import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paciente } from "../../../app/models/pacientes";
import { usePacienteService } from "../../../app/services/pacientes.service";
import { Alert } from "../../common/mensagem";
import { Layout } from "../../layout";
import { PacienteForm } from "./form";

export const CadastroPaciente:React.FC=() =>
{
    const[mensagens,setMensagens] = useState<Array<Alert>>([])
    const[paciente,setPaciente] = useState<Paciente>({})
  
    const service = usePacienteService()
    const{id} = useParams();

    useEffect(() => {
        if (id) {
            service.getById(parseInt(id)).then((pacienteEncontrado) => {
                setPaciente(pacienteEncontrado);
            });
        }
    }, [id]);
    const handleSubmit = (paciente:Paciente) =>
    {
        if(paciente.id)
        {
            service.atualizar(paciente).then(()=>
            {
                setMensagens([{field:"alert alert-success",texto:"Paciente atualizado com sucesso!"}])
            })
        }
        else{
            service.salvar(paciente).then(response=>
                {
                    setMensagens([{field:"alert alert-success",texto:"Paciente salvo com sucesso!"}])
                }).
                catch(error=>
                {
                    setMensagens([{field:"alert alert-danger",texto:"Houve um erro ao salvar o paciente!"}])
                })
        }
       
    }
    return(
        <Layout titulo={paciente.id?"Atualizar Paciente":"Cadastrar Paciente"} tittleClassName="h1 display-6 fw-bold text-primary mt-4" className="text-center" mensagens={mensagens}>
            <PacienteForm onSubmit={handleSubmit} paciente={paciente}/>
        </Layout>
    )
}