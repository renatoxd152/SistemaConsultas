import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Usuario } from "../../../app/models/usuarios";
import { useUsuarioService } from "../../../app/services/usuario.service";
import { Alert } from "../../common/mensagem";
import { Layout } from "../../layout";
import { UsuarioForm } from "./form";
export const UsuarioEdit:React.FC = ()=>
{
    const[usuario,setUsuario]=useState<Usuario>({});
    const[mensagens,setMensagens] = useState<Array<Alert>>([])
    const service = useUsuarioService();
    const{id} = useParams();

    useEffect(() => {
        if (id) {
            service.getById(parseInt(id)).then((usuarioEncontrado) => {
                setUsuario(usuarioEncontrado);
            });
        }
    }, [id]);
    const handleSubmit = (usuario:Usuario) =>
    {
        service.atualizar(usuario).then(()=>
        {
            setMensagens([{field:"alert alert-success",texto:"Usuário atualizado com sucesso!"}])
        }).catch(()=>
        {
            setMensagens([{field:"alert alert-success",texto:"Houve um erro ao atualizar o usuário!"}])
        })                                                                                                                                                                                                                                                                                                                                                                               
    }
    return(
         <Layout titulo="Listagem de Pacientes" tittleClassName="h1 display-6 fw-bold text-primary mt-4" className="text-center" mensagens={mensagens}>
            <UsuarioForm onSubmit={handleSubmit} usuario={usuario}/>
         </Layout>
    )
}