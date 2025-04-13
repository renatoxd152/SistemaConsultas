import { useFormik } from "formik";
import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Medico } from "../../../app/models/medicos";
import { estadosBrasil } from "../../../app/util/estados";
import { Input, InputCPF, InputRG } from "../../common/input";
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
    id:0,
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

    const navigate = useNavigate()
   
    return(
        <div className="container mt-5">
        <form onSubmit={formik.handleSubmit} className="order p-4 rounded shadow bg-white">
            {
                formik.values.id !==0  &&
                (
                    <div className="row">
                    <Input id="id" name="id" 
                        TextLabel="Código:"
                        disabled
                        onChange={formik.handleChange}
                        value={formik.values.id }
                    />
                    </div>
                )
            }
            <div className="row">
                
                <Input id="nome" name="nome" type="text" onChange={formik.handleChange} TextLabel="Digite o nome:" errorClassName="text-danger small mt-1" value={formik.values.nome} error={formik.errors.nome} className="col p-3" inputClassName="form-control"/>
                <Input id="dataNascimento" name="dataNascimento" type="date" onChange={formik.handleChange} TextLabel="Escolha a data de nascimento:" errorClassName="text-danger small mt-1" error={formik.errors.dataNascimento} className="col p-3" inputClassName="form-control" value={formik.values.dataNascimento}/>
                <div className="col mt-3">
                    <Select id="genero" value={formik.values.genero} onChange={formik.handleChange} name="genero" label="Selecione o gênero:" opcoes={opcoes} className="input-group mb-3 mt-4" selectClassName="form-select" labelClassName="input-group-text" />
                </div>
            </div>
            <div className="row">
                <InputCPF id="cpf" name="cpf" type="text" onChange={formik.handleChange} TextLabel="Digite o CPF:" errorClassName="text-danger small mt-1" value={formik.values.cpf} error={formik.errors.cpf} className="col p-3" inputClassName="form-control" maxLength={14}/>
                <InputRG id="rg" name="rg" type="text" onChange={formik.handleChange} TextLabel="Digite o RG:" errorClassName="text-danger small mt-1" value={formik.values.rg} error={formik.errors.rg} className="col p-3" inputClassName="form-control" maxLength={9}/>
                <Input id="endereco" name="endereco" type="text" onChange={formik.handleChange} TextLabel="Digite o endereco:" errorClassName="text-danger small mt-1" value={formik.values.endereco} error={formik.errors.endereco} className="col p-3" inputClassName="form-control"/>
            </div>

            <div className="row">
                
                <Input id="telefone" name="telefone" type="text" onChange={formik.handleChange} TextLabel="Digite o telefone:" errorClassName="text-danger small mt-1" value={formik.values.telefone} error={formik.errors.telefone} className="col p-3" inputClassName="form-control" maxLength={11}/>
                <Input id="email" name="email" type="text" onChange={formik.handleChange} TextLabel="Digite o email:" errorClassName="text-danger small mt-1" value={formik.values.email} error={formik.errors.email} className="col p-3" inputClassName="form-control"/>
                <Input id="numeroCRM" name="numeroCRM" type="text" onChange={formik.handleChange} TextLabel="Digite o CRM:" errorClassName="text-danger small mt-1" value={formik.values.numeroCRM} error={formik.errors.numeroCRM} className="col p-3" inputClassName="form-control"/>

            </div>

            <div className="row">
                <Select id="estadoCRM" name="estadoCRM" value={formik.values.estadoCRM} onChange={formik.handleChange} label="Selecione o estado do CRM:" opcoes={estadosBrasil} className="col" selectClassName="form-select" labelClassName="input-group-text" />
                <Input id="especialidade" name="especialidade" type="text" onChange={formik.handleChange} TextLabel="Digite a especialidade:" errorClassName="text-danger small mt-1" value={formik.values.especialidade} error={formik.errors.especialidade} className="col" inputClassName="form-control"/>
                <Input id="subespecialidade" name="subespecialidade" type="text" onChange={formik.handleChange} TextLabel="Digite a subespecialidade" errorClassName="text-danger small mt-1" value={formik.values.subespecialidade} error={formik.errors.subespecialidade} className="col" inputClassName="form-control"/>
                <Input id="anoConclusao" name="anoConclusao" type="number" onChange={formik.handleChange} TextLabel="Digite o ano de conclusão:" errorClassName="text-danger small mt-1"  error={formik.errors.anoConclusao} className="col" inputClassName="form-control" 
                min={1900} max={new Date().getFullYear()} value={formik.values.anoConclusao ? parseInt(formik.values.anoConclusao.toString(), 10) : ""}/>

            </div>
       

            <div className="p-5">
               
                <button type="submit" className="btn btn-primary p-2"> 
                    {
                    formik.values.id ? "Atualizar médico" : "Cadastrar médico" }</button>
            </div>

            <div className="d-flex justify-content-start mt-4">
                <Button
                    type="button"
                    label="Voltar para a listagem" 
                    className="btn btn-secondary" 
                    icon="pi pi-arrow-left" 
                    onClick={() => navigate("/medicos/listar")} 
                />
            </div>
        </form>
       
        </div>
    )
}