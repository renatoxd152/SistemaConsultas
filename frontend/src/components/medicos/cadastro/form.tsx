import { useFormik } from "formik";
import React from "react";
import { Medico } from "../../../app/models/medicos";
import { Input } from "../../common/input";
import { Select } from "../../common/select";
import { validationScheme } from "./validationSchema";
interface MedicoFormProps
{
    onSubmit:(medico:Medico) =>void;
    medico:Medico;
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
    nome:"",
    dataNascimento:"",
    genero:"1",
    cpf:"",
    rg:"",
    endereco:"",
    telefone:"",
    email:"",
    numeroCRM:"",
    estadoCRM:"",
    especialidade:"",
    subespecialidade:"",
    anoConclusao:0,
}
export const MedicoForm:React.FC<MedicoFormProps> = ({
    onSubmit,medico
}) =>
{
    const formik = useFormik<Medico>({
        initialValues:{...formScheme,...medico},
        onSubmit,
        validationSchema:validationScheme,
        validateOnChange: false,
        enableReinitialize:true

    })
console.log(formik)
    return(
        <div className="container mt-5">
        <form onSubmit={formik.handleSubmit} className="order p-4 rounded shadow bg-white">
            <div className="row">
                <Input id="id" name="id" 
                        TextLabel="Código:"
                        disabled
                        onChange={formik.handleChange}
                        value={formik.values.id }
                    />
                <Input id="nome" name="nome" type="text" onChange={formik.handleChange} TextLabel="Digite o nome:" errorClassName="text-danger small mt-1" value={formik.values.nome} error={formik.errors.nome} className="col p-3" inputClassName="form-control"/>
                <Input id="dataNascimento" type="date" onChange={formik.handleChange} TextLabel="Escolha a data de nascimento:" errorClassName="text-danger small mt-1" error={formik.errors.dataNascimento} className="col p-3" inputClassName="form-control" value={formik.values.dataNascimento}/>
                <div className="col mt-3">
                    <Select id="genero" value={formik.values.genero} onChange={formik.handleChange} name="genero" label="Selecione o gênero:" opcoes={opcoes} className="input-group mb-3 mt-4" selectClassName="form-select" labelClassName="input-group-text" />
                </div>
            </div>
            <div className="row">
                <Input id="cpf" type="text" onChange={formik.handleChange} TextLabel="Digite o CPF:" errorClassName="text-danger small mt-1" value={formik.values.cpf} error={formik.errors.cpf} className="col p-3" inputClassName="form-control"/>
                <Input id="rg" type="text" onChange={formik.handleChange} TextLabel="Digite o RG:" errorClassName="text-danger small mt-1" value={formik.values.rg} error={formik.errors.rg} className="col p-3" inputClassName="form-control"/>
                <Input id="endereco" type="text" onChange={formik.handleChange} TextLabel="Digite o endereco:" errorClassName="text-danger small mt-1" value={formik.values.endereco} error={formik.errors.endereco} className="col p-3" inputClassName="form-control"/>
            </div>

            <div className="row">
                
                <Input id="telefone" type="text" onChange={formik.handleChange} TextLabel="Digite o telefone:" errorClassName="text-danger small mt-1" value={formik.values.telefone} error={formik.errors.telefone} className="col p-3" inputClassName="form-control"/>
                <Input id="email" type="text" onChange={formik.handleChange} TextLabel="Digite o email:" errorClassName="text-danger small mt-1" value={formik.values.email} error={formik.errors.email} className="col p-3" inputClassName="form-control"/>
                <Input id="numeroCRM" type="text" onChange={formik.handleChange} TextLabel="Digite o CRM:" errorClassName="text-danger small mt-1" value={formik.values.numeroCRM} error={formik.errors.numeroCRM} className="col p-3" inputClassName="form-control"/>

            </div>

            <div className="row">
                <Input id="estadoCRM" type="text" onChange={formik.handleChange} TextLabel="Digite o estado CRM:" errorClassName="text-danger small mt-1" value={formik.values.estadoCRM} error={formik.errors.estadoCRM} className="col" inputClassName="form-control"/>
                <Input id="especialidade" type="text" onChange={formik.handleChange} TextLabel="Digite a especialidade:" errorClassName="text-danger small mt-1" value={formik.values.especialidade} error={formik.errors.especialidade} className="col" inputClassName="form-control"/>
                <Input id="subespecialidade" type="text" onChange={formik.handleChange} TextLabel="Digite a subespecialidade" errorClassName="text-danger small mt-1" value={formik.values.subespecialidade} error={formik.errors.subespecialidade} className="col" inputClassName="form-control"/>
                <Input id="anoConclusao" type="number" onChange={formik.handleChange} TextLabel="Digite o ano de conclusão:" errorClassName="text-danger small mt-1"  error={formik.errors.anoConclusao} className="col" inputClassName="form-control" 
                min={1900} max={new Date().getFullYear()} value={formik.values.anoConclusao ? parseInt(formik.values.anoConclusao.toString(), 10) : ""}/>

            </div>
       

            <div className="p-5">
               
                <button type="submit" className="btn btn-primary p-2"> 
                    {
                    formik.values.id ? "Atualizar médico" : "Cadastrar médico" }</button>
            </div>
        </form>
        </div>
    )
}