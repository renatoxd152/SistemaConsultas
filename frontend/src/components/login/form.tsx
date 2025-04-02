import { useFormik } from "formik";
import React from "react";
import { Usuario } from "../../app/models/usuarios";
import { Input } from "../common/input";
import { validationScheme } from "./validationSchema";
interface LoginUsuarioProps
{
    onSubmit:(usuario:Usuario)=>void;
}
export const LoginUsuarioForm:React.FC<LoginUsuarioProps> = ({
    onSubmit
}) =>
{
    const formScheme:Usuario =
    {
        login:"",
        senha:"",
    }
    const formik = useFormik({
        initialValues:{...formScheme},
        onSubmit,
        validationSchema:validationScheme,
        validateOnChange: false
    })
    return(
        <form onSubmit={formik.handleSubmit} className="order p-4 rounded shadow bg-white">
            <Input id="login" name="login" type="text" icone='fas fa-user' onChange={formik.handleChange}  error={formik.errors.login} className="col p-4" inputClassName="form-control" value={formik.values.login} errorClassName="text-danger small mt-1" placeholder="Digite o login"/>
            <Input id="senha" name="senha" type="password" icone='fas fa-lock' onChange={formik.handleChange}  error={formik.errors.senha} className="col p-4" inputClassName="form-control" value={formik.values.senha} errorClassName="text-danger small mt-1" placeholder="Digite a senha"/>
            <div><a href="/cadastro">Não é cadastrado? Cadastra-se</a></div>
            
            <button type="submit" className="btn btn-primary border-radius">Login</button>
        </form>
    )
}