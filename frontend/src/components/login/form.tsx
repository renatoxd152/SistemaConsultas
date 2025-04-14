import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import React from "react";
import { Usuario } from "../../app/models/usuarios";
import { Input } from "../common/input";
import { validationScheme } from "./validationSchema";

interface LoginUsuarioProps {
    onSubmit: (usuario: Usuario) => void;
}

export const LoginUsuarioForm: React.FC<LoginUsuarioProps> = ({ onSubmit }) => {
    const formScheme: Usuario = {
        login: "",
        senha: "",
    };

    const formik = useFormik({
        initialValues: { ...formScheme },
        onSubmit,
        validationSchema: validationScheme,
        validateOnChange: false
    });

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="shadow-lg rounded bg-white d-flex flex-md-row flex-column overflow-hidden" style={{ width: "100vw",height:"60vh"}}>
                
                <div className="bg-primary text-white d-flex flex-column justify-content-center align-items-center p-4" style={{ minWidth: "300px", flex: 1 }}>
                    <i className="fas fa-clinic-medical fa-4x mb-3"></i>
                    <h3 className="mb-3">Clínica Vida e Saúde</h3>
                    <p className="text-center">Bem-vindo! Faça login para acessar o sistema.</p>
                </div>
                <div className="p-4 d-flex flex-column justify-content-center" style={{ flex: 1 }}>
                    <form onSubmit={formik.handleSubmit} className="w-100 text-center">
                        <h4 className="text-primary mb-4">Acesse sua Conta</h4>

                        <Input
                            id="login"
                            name="login"
                            type="text"
                            icone="fas fa-user"
                            onChange={formik.handleChange}
                            error={formik.errors.login}
                            className="mb-3"
                            inputClassName="form-control"
                            value={formik.values.login}
                            errorClassName="text-danger small mt-1"
                            placeholder="Digite seu login"
                        />
                        <Input
                            id="senha"
                            name="senha"
                            type="password"
                            icone="fas fa-lock"
                            onChange={formik.handleChange}
                            error={formik.errors.senha}
                            className="mb-3"
                            inputClassName="form-control"
                            value={formik.values.senha}
                            errorClassName="text-danger small mt-1"
                            placeholder="Digite sua senha"
                        />

                        <button type="submit" className="btn btn-primary w-100 py-2">Entrar</button>

                        <div className="mt-3">
                            <a href="/cadastro" className="text-decoration-none text-primary">
                                <i className="fas fa-user-plus me-2"></i>Não tem uma conta? Cadastre-se
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
