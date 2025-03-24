import { useState } from "react"
import { Medico } from "../../../app/models/medicos"
import { useMedicoService } from "../../../app/services/medicos.service"
import { Alert } from "../../common/mensagem"
import { Layout } from "../../layout"
import { MedicoForm } from "./form"

export const CadastroMedico:React.FC = () =>
{
    const service = useMedicoService()
    const[mensagens,setMensagens] = useState<Array<Alert>>([])
    const handleSubmit = (medico:Medico) =>
    {
        console.log(medico)
        service.salvar(medico).then(response=>
        {
            setMensagens([{field:"alert alert-success",texto:"Médico salvo com sucesso!"}])
        }).
        catch(error=>
            {
                setMensagens([{field:"alert alert-danger",texto:"Houve um erro ao salvar o medicamento!"}])
            })
    }
    return(
        <Layout titulo="Cadastro de Médicos" tittleClassName="h1 display-6 fw-bold text-primary mt-4" className="text-center" mensagens={mensagens}>
            <MedicoForm onSubmit={handleSubmit}/>
        </Layout>
    )
}