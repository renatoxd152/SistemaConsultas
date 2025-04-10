import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import React from "react";
import { Medicamento } from "../../../app/models/medicamentos";
import { Input } from "../../common/input";
import { validationScheme } from "../validationScheme";

interface CadastroFormProps {
    onSubmit: (medicamento: Medicamento) => void;
    medicamento:Medicamento;
}

export const CadastroMedicamentoForm: React.FC<CadastroFormProps> = ({ onSubmit,medicamento }) => {
    const formScheme: Medicamento = {
        id: 0,
        medicamento: ""
    };

    const formik = useFormik<Medicamento>({
        onSubmit,
        initialValues: { ...formScheme,...medicamento },
        validationSchema:validationScheme,
        validateOnChange: false,
        enableReinitialize:true
    });

    return (
        <div className="container d-flex justify-content-center">
          
                <form onSubmit={formik.handleSubmit} className="text-center">
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
                                    </div>)}
                    <Input 
                        id="medicamento" 
                        type="text" 
                        onChange={formik.handleChange} 
                        TextLabel="Nome do medicamento:" 
                        errorClassName="text-danger small mt-1" 
                        value={formik.values.medicamento}
                        error={formik.errors.medicamento} 
                        className="mb-3" 
                        inputClassName="form-control" 
                        placeholder="Digite o nome do medicamento"
                    />
                    <button type="submit" className="btn btn-primary w-100 py-2">{formik.values.id? "Atualizar":"Cadastrar"}</button>
                </form>

        </div>
    );
};