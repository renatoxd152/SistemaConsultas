import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Usuario } from "../../app/models/usuarios";
import { useUsuarioService } from "../../app/services/usuario.service";
import { Alert } from "../common/mensagem";
import { LayoutTelaInicial } from "../layout/cadastro";
import { useAuth } from "../provider/RotaAutenticada";
import { LoginUsuarioForm } from "./form";
export const LoginUsuario:React.FC = () =>
{ 
    const[mensagens,setMensagens] = useState<Array<Alert>>([]);
    const [carregando, setCarregando] = useState(false);

    const service = useUsuarioService();
    const {setToken} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (usuario: Usuario) => {
        setCarregando(true);
        setMensagens([]);
    
        service.login(usuario)
            .then((response) => {
                if (response.token) {
                    setToken(response.token);
                    navigate("/consultas/listar");
                }
            })
            .catch(() => {
                setMensagens([{ field: "alert alert-danger", texto: "Houve um erro ao logar com o usuário!" }]);
            })
            .finally(() => {
                setCarregando(false);
            });
    };
    
    return(
       <LayoutTelaInicial titulo="Login de usuário" mensagens={mensagens} tittleClassName="h1 display-6 fw-bold text-primary mt-4 text-center">
            
            <LoginUsuarioForm onSubmit={handleSubmit} carregando={carregando}/>
       </LayoutTelaInicial>
    )
}