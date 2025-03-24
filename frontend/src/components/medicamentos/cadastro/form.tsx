import { useFormik } from "formik";
import React from "react";
import { Medicamento } from "../../../app/models/medicamentos";
import { Input } from "../../common/input";
import { validationScheme } from "../validationScheme";
interface CadastroFormProps
{
    onSubmit:(medicamento:Medicamento)=>void;
}
export const CadastroMedicamentoForm: React.FC<CadastroFormProps> = ({
    onSubmit
}) =>
{
    const formScheme:Medicamento =
    {
        id:0,
        medicamento:""
    }
    const formik = useFormik<Medicamento>({
        onSubmit,
        initialValues:{...formScheme},
        validationSchema:validationScheme
    })
    return(
        <form onSubmit={formik.handleSubmit} className="order p-4 rounded shadow bg-white">
            <Input id="medicamento" type="text" onChange={formik.handleChange} TextLabel="Nome do medicamento:" error={formik.errors.medicamento} className="col" inputClassName="form-control"/>
            <button type="submit" className="btn btn-primary p-2">Cadastrar medicamento</button>
        </form>
    )
}