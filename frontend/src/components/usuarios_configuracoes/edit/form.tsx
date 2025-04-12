import { useFormik } from "formik";
import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Usuario } from "../../../app/models/usuarios";
import { Input } from "../../common/input";
interface UsuarioFormProps
{
    onSubmit:(usuario:Usuario)=>void;
    usuario:Usuario;
}
export const UsuarioForm:React.FC<UsuarioFormProps> = ({onSubmit,usuario}) =>
{
    const formScheme:Usuario =
    {
        id:0,
        login:"",
        senha:"",
        role:""
    }
   
    const formik = useFormik(
    {
        initialValues:{...formScheme,...usuario},
        onSubmit,
        validateOnChange: false,
        enableReinitialize:true
    }
    )
    console.log(formik.values.role)
    const navigate = useNavigate()
    return(
        <form onSubmit={formik.handleSubmit}>
            
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
               
            <div className="row">
                <Input id="login" name="login" type="text" onChange={formik.handleChange} errorClassName="text-danger small mt-1" value={formik.values.login} error={formik.errors.login} TextLabel="Login:" className="col" inputClassName="form-control"/>
            </div>
            <div className="row">
                <Input id="senha" name="senha" type="password" onChange={formik.handleChange} errorClassName="text-danger small mt-1" value={formik.values.senha} error={formik.errors.senha} TextLabel="Senha:" className="col" inputClassName="form-control"/>
            </div>
            <div className="row">
                <label className="form-label">Nível de usuário:</label>
                <div className="d-flex gap-3">
                    <Input
                    id="role_admin"
                    name="role"
                    type="radio"
                    onChange={formik.handleChange}
                    value="ROLE_ADMINISTRATOR"
                    checked={formik.values.role === "ROLE_ADMINISTRATOR"}
                    TextLabel="Administrador"
                    className="form-check form-check-inline"
                    />

                    <Input
                    id="role_costumer"
                    name="role"
                    type="radio"
                    onChange={formik.handleChange}
                    value="ROLE_CUSTOMER"
                    checked={formik.values.role === "ROLE_CUSTOMER"}
                    TextLabel="Comum"
                    className="form-check form-check-inline"
                    />
                </div>
                {formik.errors.role && (
                    <p className="text-danger small mt-1">{formik.errors.role}</p>
                )}
                </div>
            <div className="p-4">
                <button type="submit" className="btn btn-primary p-2">Atualizar Paciente</button>
            </div>
            <div className="d-flex justify-content-start mt-4">
                <Button
                    type="button"
                    label="Voltar para a listagem" 
                    className="btn btn-secondary" 
                    icon="pi pi-arrow-left" 
                    onClick={() => navigate("/configuracoes")} 
                />
            </div>
        </form>
    )
}