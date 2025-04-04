import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import React from "react";
import { Medicamento } from "../../../app/models/medicamentos";
import { Input } from "../../common/input";
import { validationScheme } from "../validationScheme";

interface CadastroFormProps {
    onSubmit: (medicamento: Medicamento) => void;
}

export const CadastroMedicamentoForm: React.FC<CadastroFormProps> = ({ onSubmit }) => {
    const formScheme: Medicamento = {
        id: 0,
        medicamento: ""
    };

    const formik = useFormik<Medicamento>({
        onSubmit,
        initialValues: { ...formScheme },
        validationSchema: validationScheme,
        validateOnChange: false
    });

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f8f9fa" }}>
            <div className="card shadow-lg p-5" style={{ width: "400px", borderRadius: "12px" }}>
                <h3 className="text-primary text-center mb-4">Cadastro de Medicamento</h3>
                <form onSubmit={formik.handleSubmit} className="text-center">
                    <Input 
                        id="medicamento" 
                        type="text" 
                        onChange={formik.handleChange} 
                        TextLabel="Nome do medicamento:" 
                        errorClassName="text-danger small mt-1" 
                        error={formik.errors.medicamento} 
                        className="mb-3" 
                        inputClassName="form-control" 
                        placeholder="Digite o nome do medicamento"
                    />
                    <button type="submit" className="btn btn-primary w-100 py-2">Cadastrar</button>
                </form>
            </div>
        </div>
    );
};