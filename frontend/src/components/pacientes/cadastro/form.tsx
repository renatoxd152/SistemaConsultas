import { useFormik } from "formik";
import React from "react";
import { Paciente } from "../../../app/models/pacientes";
import { Input } from "../../common/input";
import { validationScheme } from "./validationSchema";
interface PacienteProps{
    onSubmit:(paciente:Paciente)=>void;
}
export const PacienteForm:React.FC<PacienteProps> = ({
    onSubmit
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
            initialValues:{...formScheme},
            onSubmit,
            validationSchema:validationScheme,
            validateOnChange: false

        }
    )
    return(
        <form onSubmit={formik.handleSubmit}  className="order p-4 rounded shadow bg-white">
            <div className="row">
                <Input id="nome" name="nome" type="text" onChange={formik.handleChange} errorClassName="text-danger small mt-1" error={formik.errors.nome} TextLabel="Nome do Paciente" className="col" inputClassName="form-control"/>
                <Input id="CPF" name="cpf" type="text" onChange={formik.handleChange} errorClassName="text-danger small mt-1" error={formik.errors.cpf} TextLabel="CPF" className="col" inputClassName="form-control"/>
            </div>
            <div className="row">
                <Input id="RG:" name="rg" type="text" onChange={formik.handleChange} errorClassName="text-danger small mt-1" error={formik.errors.rg} TextLabel="RG" className="col" inputClassName="form-control"/>
                <Input id="dataNascimento" name="dataNascimento" type="date" onChange={formik.handleChange} errorClassName="text-danger small mt-1" error={formik.errors.dataNascimento} TextLabel="Data de Nascimento" className="col" inputClassName="form-control"/>
            </div>
            <div className="p-4">
                <button type="submit" className="btn btn-primary p-2">Cadastrar Paciente</button>
            </div>
        </form>
    )
}