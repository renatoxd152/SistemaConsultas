import { Medico } from "../../../app/models/medicos"
import { Layout } from "../../layout"
import { MedicoForm } from "./form"

export const CadastroMedico:React.FC = () =>
{
    const handleSubmit = (medico:Medico) =>
    {
        console.log("oi")
    }
    return(
        <Layout titulo="Cadastro de Médicos" className="text-center">
            <MedicoForm onSubmit={handleSubmit}/>
        </Layout>
    )
}