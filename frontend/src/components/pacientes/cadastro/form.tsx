import { useFormik } from "formik";
import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Paciente } from "../../../app/models/pacientes";
import { Input, InputCPF, InputRG } from "../../common/input";
import { validationScheme } from "./validationSchema";
interface PacienteProps{
    onSubmit:(paciente:Paciente)=>void;
    paciente:Paciente;
}
export const PacienteForm:React.FC<PacienteProps> = ({
    onSubmit,paciente
}) =>
{
    const formScheme:Paciente = {
        id:0,
        cpf:"",
        dataNascimento:"",
        nome:"",
        rg:""
    }
    const formik = useFormik(
        {
            initialValues:{...formScheme,...paciente},
            onSubmit,
            validationSchema:validationScheme,
            validateOnChange: false,
            enableReinitialize:true
        }
    )
    const navigate = useNavigate()
    return(
        <form onSubmit={formik.handleSubmit}  className="order p-4 rounded shadow bg-white">
           {formik.values.id !== 0 && (
                <div className="row">
                    <Input 
                    id="id" 
                    name="id" 
                    TextLabel="Código:"
                    disabled
                    onChange={formik.handleChange}
                    value={formik.values.id}
                    />
                </div>
                )}
            <div className="row">
                <Input id="nome" name="nome" type="text" onChange={formik.handleChange} errorClassName="text-danger small mt-1" value={formik.values.nome} error={formik.errors.nome} TextLabel="Nome do Paciente" className="col" inputClassName="form-control"/>
                <InputCPF id="CPF" name="cpf" type="text" onChange={formik.handleChange} errorClassName="text-danger small mt-1" value={formik.values.cpf} error={formik.errors.cpf} TextLabel="CPF" className="col" inputClassName="form-control" maxLength={14}/>
            </div>
            <div className="row">
                <InputRG id="RG:" name="rg" type="text" onChange={formik.handleChange} errorClassName="text-danger small mt-1" value={formik.values.rg} error={formik.errors.rg} TextLabel="RG" className="col" inputClassName="form-control" maxLength={9}/>
                <Input id="dataNascimento" name="dataNascimento" type="date" onChange={formik.handleChange} errorClassName="text-danger small mt-1" value={formik.values.dataNascimento} error={formik.errors.dataNascimento} TextLabel="Data de Nascimento" className="col" inputClassName="form-control"/>
            </div>
            <div className="p-4">
                <button type="submit" className="btn btn-primary p-2">{formik.values.id ? "Atualizar Paciente": "Cadastrar Paciente"}</button>
            </div>
            <div className="d-flex justify-content-start mt-4">
                <Button
                    type="button"
                    label="Voltar para a listagem" 
                    className="btn btn-secondary" 
                    icon="pi pi-arrow-left" 
                    onClick={() => navigate("/pacientes/listar")} 
                />
            </div>
        </form>
    )
}