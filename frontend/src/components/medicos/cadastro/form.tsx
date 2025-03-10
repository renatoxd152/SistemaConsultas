import { useFormik } from "formik";
import React from "react";
import { Medico } from '../../../../app/models/medicos/index';
import { Input } from "../../../common/input";
import { Select } from "../../../common/select";
import { validationScheme } from "./validationSchema";
interface MedicoFormProps
{
    onSubmit:(medico:Medico) =>void;
}
interface Opcao{
    value:string;
    label:string;
}
const opcoes:Opcao[] = [
    {value:"1",label:"Masculino"},
    {value:"2",label:"Feminino"},
]
const formScheme:Medico = {
    id:0,
    nome:"",
    dataNascimento:"",
    genero:"",
    cpf:"",
    rg:"",
    endereco:"",
    telefone:"",
    email:"",
    numeroCRM:"",
    estadoCRM:"",
    especialidade:"",
    subespecialidade:"",
    anoConclusao:"",
}
export const MedicoForm:React.FC<MedicoFormProps> = ({
    onSubmit
}) =>
{
    const formik = useFormik<Medico>({
        initialValues:{...formScheme},
        onSubmit,
        validationSchema:validationScheme

    })
    return(
        <form onSubmit={formik.handleSubmit}>
            <div className="row">
                <Input id="nome" type="text" onChange={formik.handleChange} TextLabel="Digite o nome:" error={formik.errors.nome} className="col"/>
                <Input id="dataNascimento" type="date" onChange={formik.handleChange} TextLabel="Escolha a data de nascimento:" error={formik.errors.dataNascimento} className="col"/>
                <Select id="genero" name="genero" label="Selecione o gênero:" opcoes={opcoes} className="col" />
            </div>
            <div className="row">
                <Input id="cpf" type="text" onChange={formik.handleChange} TextLabel="Digite o CPF:" error={formik.errors.cpf} className="col"/>
                <Input id="rg" type="text" onChange={formik.handleChange} TextLabel="Digite o RG:" error={formik.errors.rg} className="col"/>
                <Input id="endereco" type="text" onChange={formik.handleChange} TextLabel="Digite o endereco:" error={formik.errors.endereco} className="col"/>
            </div>

            <div className="row">
                
                <Input id="telefone" type="text" onChange={formik.handleChange} TextLabel="Digite o telefone:" error={formik.errors.telefone} className="col"/>
                <Input id="email" type="text" onChange={formik.handleChange} TextLabel="Digite o email:" error={formik.errors.email} className="col"/>
                <Input id="numeroCRM" type="text" onChange={formik.handleChange} TextLabel="Digite o CRM:" error={formik.errors.numeroCRM} className="col"/>

            </div>

            <div className="row">
                <Input id="estadoCRM" type="text" onChange={formik.handleChange} TextLabel="Digite o estado CRM:" error={formik.errors.estadoCRM} className="col"/>
                <Input id="especialidade" type="text" onChange={formik.handleChange} TextLabel="Digite a especialidade:" error={formik.errors.especialidade} className="col"/>
                <Input id="subespecialidade" type="text" onChange={formik.handleChange} TextLabel="Digite a subespecialidade" error={formik.errors.subespecialidade} className="col"/>
                <Input id="anoConclusao" type="date" onChange={formik.handleChange} TextLabel="Digite o ano de conclusão:" error={formik.errors.anoConclusao} className="col"/>

            </div>


            <div>
                <button type="button">Cadastrar Médico</button>
            </div>
        </form>
    )
}