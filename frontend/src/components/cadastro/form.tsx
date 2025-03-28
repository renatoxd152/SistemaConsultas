import '@fortawesome/fontawesome-free/css/all.css';
import { useFormik } from "formik";
import React from "react";
import { Administrador } from "../../app/models/administrador";
import { Input } from "../common/input";
import { validationScheme } from "./validationSchema";
interface CadastroAdministradorProps
{
    onSubmit:(administrador:Administrador)=>void;
}
export const CadastroAdministrador: React.FC<CadastroAdministradorProps> = (
    {
        onSubmit
    }
) =>
{
    const formScheme =
    {
        id:0,
        login:"",
        senha:"",
        senhaConfirmar:""
    }
    const formik = useFormik(
        {
            initialValues:{...formScheme},
            onSubmit,
            validationSchema:validationScheme
        }
    )
    return(
        <form onSubmit={formik.handleSubmit} className="order p-4 rounded shadow bg-white">
            
            <Input id="login" name="login" type="text" icone='fas fa-user' onChange={formik.handleChange}  error={formik.errors.login} className="col p-4" inputClassName="form-control" value={formik.values.login} errorClassName="text-danger small mt-1" placeholder="Digite o login"/>
            <Input id="senha" name="senha" type="password" icone='fas fa-lock' onChange={formik.handleChange}  error={formik.errors.senha} className="col p-4" inputClassName="form-control" value={formik.values.senha} errorClassName="text-danger small mt-1" placeholder="Digite a senha"/>
            <Input id="senhaConfirmar" name="senhaConfirmar" icone='fas fa-lock' type="password" onChange={formik.handleChange} error={formik.errors.senhaConfirmar} className="col p-4" inputClassName="form-control" value={formik.values.senhaConfirmar} errorClassName="text-danger small mt-1" placeholder="Digite a senha novamente"/>
            
            
            <button type="submit" className="btn btn-primary">Cadastrar</button>
        </form>
    )
}