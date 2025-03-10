import { useFormik } from "formik";
import React from "react";
import { Medico } from "../../../app/models/medicos";
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
        <div className="container mt-5">
        <form onSubmit={formik.handleSubmit} className="order p-4 rounded shadow bg-white">
            <div className="row">
                <Input id="nome" type="text" onChange={formik.handleChange} TextLabel="Digite o nome:" error={formik.errors.nome} className="col p-3" inputClassName="form-control"/>
                <Input id="dataNascimento" type="date" onChange={formik.handleChange} TextLabel="Escolha a data de nascimento:" error={formik.errors.dataNascimento} className="col p-3" inputClassName="form-control"/>
                <div className="col mt-3">
                    <Select id="genero" name="genero" label="Selecione o gênero:" opcoes={opcoes} className="input-group mb-3 mt-4" selectClassName="form-select" labelClassName="input-group-text" />
                </div>
            </div>
            <div className="row">
                <Input id="cpf" type="text" onChange={formik.handleChange} TextLabel="Digite o CPF:" error={formik.errors.cpf} className="col p-3" inputClassName="form-control"/>
                <Input id="rg" type="text" onChange={formik.handleChange} TextLabel="Digite o RG:" error={formik.errors.rg} className="col p-3" inputClassName="form-control"/>
                <Input id="endereco" type="text" onChange={formik.handleChange} TextLabel="Digite o endereco:" error={formik.errors.endereco} className="col p-3" inputClassName="form-control"/>
            </div>

            <div className="row">
                
                <Input id="telefone" type="text" onChange={formik.handleChange} TextLabel="Digite o telefone:" error={formik.errors.telefone} className="col p-3" inputClassName="form-control"/>
                <Input id="email" type="text" onChange={formik.handleChange} TextLabel="Digite o email:" error={formik.errors.email} className="col p-3" inputClassName="form-control"/>
                <Input id="numeroCRM" type="text" onChange={formik.handleChange} TextLabel="Digite o CRM:" error={formik.errors.numeroCRM} className="col p-3" inputClassName="form-control"/>

            </div>

            <div className="row">
                <Input id="estadoCRM" type="text" onChange={formik.handleChange} TextLabel="Digite o estado CRM:" error={formik.errors.estadoCRM} className="col" inputClassName="form-control"/>
                <Input id="especialidade" type="text" onChange={formik.handleChange} TextLabel="Digite a especialidade:" error={formik.errors.especialidade} className="col" inputClassName="form-control"/>
                <Input id="subespecialidade" type="text" onChange={formik.handleChange} TextLabel="Digite a subespecialidade" error={formik.errors.subespecialidade} className="col" inputClassName="form-control"/>
                <Input id="anoConclusao" type="date" onChange={formik.handleChange} TextLabel="Digite o ano de conclusão:" error={formik.errors.anoConclusao} className="col" inputClassName="form-control"/>

            </div>


            <div className="p-5">
                <button type="button" className="btn btn-primary p-2">Cadastrar Médico</button>
            </div>
        </form>
        </div>
    )
}