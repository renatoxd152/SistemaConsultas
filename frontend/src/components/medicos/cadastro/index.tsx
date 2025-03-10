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
        <Layout titulo="Cadastro de Médicos" tittleClassName="h1 display-6 fw-bold text-primary mt-4" className="text-center">
            <MedicoForm onSubmit={handleSubmit}/>
        </Layout>
    )
}