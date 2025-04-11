import '@fortawesome/fontawesome-free/css/all.css';
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Usuario } from '../../app/models/usuarios';
import { Input } from "../common/input";
import { Select } from '../common/select';
import { validationScheme } from "./validationSchema";
interface CadastroUsuarioProps
{
    onSubmit:(usuario:Usuario)=>void;
}
export const CadastroUsuario: React.FC<CadastroUsuarioProps> = (
    {
        onSubmit
    }
) =>
{
    const formScheme:Usuario =
    {
        id:0,
        login:"",
        senha:"",
        senhaConfirmar:"",
        nivel:"1",
        role:"ROLE_ADMINISTRATOR"
    }
    const opcoes = [
        {value:1,label:"Administrador"},
        {value:2,label:"Comum"}
    ]
    const navigate = useNavigate()
    const formik = useFormik(
        {
            initialValues:{...formScheme},
            onSubmit: async (values) => {
                await onSubmit(values); 
                navigate("/");
            },
            validationSchema:validationScheme,
            validateOnChange: false
        }
    )
   
    useEffect(() => {
        formik.setFieldValue(
            "role",
            formik.values.nivel === "1" ? "ROLE_ADMINISTRATOR" : "ROLE_CUSTOMER"
        );
    }, [formik.values.nivel]);
    return(
        <form onSubmit={formik.handleSubmit} className="order p-4 rounded shadow bg-white">
            
            <Input id="login" name="login" type="text" icone='fas fa-user' onChange={formik.handleChange}  error={formik.errors.login} className="col p-4" inputClassName="form-control" value={formik.values.login} errorClassName="text-danger small mt-1" placeholder="Digite o login"/>
            <Input id="senha" name="senha" type="password" icone='fas fa-lock' onChange={formik.handleChange}  error={formik.errors.senha} className="col p-4" inputClassName="form-control" value={formik.values.senha} errorClassName="text-danger small mt-1" placeholder="Digite a senha"/>
            <Input id="senhaConfirmar" name="senhaConfirmar" icone='fas fa-lock' type="password" onChange={formik.handleChange} error={formik.errors.senhaConfirmar} className="col p-4" inputClassName="form-control" value={formik.values.senhaConfirmar} errorClassName="text-danger small mt-1" placeholder="Digite a senha novamente"/>
            <Select id="nivel" value={formik.values.nivel} onChange={formik.handleChange} name="nivel" label="Selecione o nível de usuário:" opcoes={opcoes} className="input-group col p-4" selectClassName="form-select" labelClassName="input-group-text" />
            <button type="submit" className="btn btn-primary border-radius">Cadastrar</button>
        </form>
    )
}