import React, { useState } from "react";
import { ConsultaCadastroForm } from "../../../app/models/consultaForm";
import { Medico } from "../../../app/models/medicos";
import { Paciente } from "../../../app/models/pacientes";
import { useConsultaService } from "../../../app/services/consultas.service";
import { useMedicoService } from "../../../app/services/medicos.service";
import { usePacienteService } from "../../../app/services/pacientes.service";
import { Alert } from "../../common/mensagem";
import { Layout } from "../../layout";
import { ConsultasForm } from "./form";

export const ConsultaCadastro:React.FC = () =>
{
    const[mensagens,setMensagens] = useState<Array<Alert>>([])
    const service = useConsultaService()
    const serviceMedico = useMedicoService()
    const servicePaciente = usePacienteService()
    const handleSubmit = async (consultaForm:ConsultaCadastroForm) =>
    {
     
        const medico:Medico = await serviceMedico.getById(consultaForm.medico_id);
        const paciente:Paciente = await servicePaciente.getById(consultaForm.paciente_id);
        
        const consulta = {
            id: consultaForm.id,
            data: consultaForm.data,
            hora: consultaForm.hora,
            motivo: consultaForm.motivo,
            tipo: consultaForm.tipo,
            status: consultaForm.status,
            observacoes: consultaForm.observacoes,
            prescricaoMedica: consultaForm.prescricaoMedica,
            medico,
            paciente
        };
        console.log(consulta)
        service.salvar(consulta).then(response=>
        {
            setMensagens([{field:"alert alert-success",texto:"Consulta salva com sucesso!"}])
        }).catch(error=>
        {
            setMensagens([{field:"alert alert-danger",texto:"Houve um erro ao salvar a consulta!"}])
        }
        )
    }
    return(
        <Layout titulo="Consultas Médicas" tittleClassName="h1 display-6 fw-bold text-primary mt-4 text-center" mensagens={mensagens}>
            <ConsultasForm onSubmit={handleSubmit}/>
        </Layout>
    )
}