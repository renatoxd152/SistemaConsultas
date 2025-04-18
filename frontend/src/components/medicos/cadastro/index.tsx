import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Medico } from "../../../app/models/medicos"
import { useMedicoService } from "../../../app/services/medicos.service"
import { Alert } from "../../common/mensagem"
import { Layout } from "../../layout"
import { MedicoForm } from "./form"

export const CadastroMedico:React.FC = () =>
{
    const service = useMedicoService()
    const[mensagens,setMensagens] = useState<Array<Alert>>([])
    const[medico,setMedico]=useState<Medico>({})

    const{id} = useParams();

    useEffect(() => {
        if (id) {
            service.getById(parseInt(id)).then((medicoEncontrado) => {
                setMedico(medicoEncontrado);
            });
        }
    }, [id]);
    
    const handleSubmit = (medico:Medico) =>
    {
        if(medico.id)
        {
            service.atualizar(medico).then(()=>
            {
                setMensagens([{field:"alert alert-success",texto:"Médico atualizado com sucesso!"}])
            })
        }
        else

        {   
            service.salvar(medico).then(()=>
            {
                setMensagens([{field:"alert alert-success",texto:"Médico salvo com sucesso!"}])
            }).
            catch(error=>
                {
                    setMensagens([{field:"alert alert-danger",texto:"Houve um erro ao salvar o medicamento!"}])
                })
        }
        
       
    }
    return(
        <Layout titulo={id ? "Atualizar médico" : "Cadastro de Médicos"} tittleClassName="h1 display-6 fw-bold text-primary mt-4" className="text-center" mensagens={mensagens}>
            <MedicoForm onSubmit={handleSubmit} medico={medico}/>
        </Layout>
    )
}