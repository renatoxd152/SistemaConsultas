import React, { useState } from "react";
import { Usuario } from "../../app/models/usuarios";
import { useUsuarioService } from "../../app/services/usuario.service";
import { Alert } from "../common/mensagem";
import { LayoutTelaInicial } from "../layout/cadastro";
import { CadastroUsuario } from "./form";

export const Cadastro:React.FC = () =>
{
    const service = useUsuarioService();
    const[mensagens,setMensagens] = useState<Array<Alert>>([])
    const handleSubmit = (usuario:Usuario) =>
    {
        service.salvar(usuario).then(()=>
        {
            setMensagens([{field:"alert alert-success",texto:"Usuário salvo com sucesso!"}])
        }).
        catch(()=>
        {
            setMensagens([{field:"alert alert-danger",texto:"Houve um erro ao salvar o usuário!"}])
        })
    }
    return(
        <LayoutTelaInicial titulo="Cadastro de Administrador" mensagens={mensagens} tittleClassName="h1 display-6 fw-bold text-primary mt-4 text-center" styleDiv={{ backgroundColor: '#f0f8ff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CadastroUsuario onSubmit={handleSubmit}/>
        </LayoutTelaInicial>
    )
}