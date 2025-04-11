import { DataTableStateEvent } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Page } from "../../app/models/common/page";
import { UsuariosRoles } from "../../app/models/usuarioroles";
import { useUsuariosRolesService } from "../../app/services/usuariosroles.service";
import { Alert } from "../common/mensagem";
import { Layout } from "../layout";
import { ListagemUsuariosTabela } from "./form";

export const ListagemUsuarios:React.FC = () =>
{
      const service = useUsuariosRolesService();
      const[mensagens,setMensagens] = useState<Array<Alert>>([])
      const [usuarios, setUsuarios] = useState<Page<UsuariosRoles>>({
        content: [],
        first: 0,
        number: 0,
        size: 10,
        totalElements: 0,
      });

  const handlePage = (event: DataTableStateEvent | null) => {
    service
      .pages()
      .then((result) => {
        setUsuarios({ ...result, first: event?.first ?? 0 });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletar = (usuario:UsuariosRoles)=>
{
    service.deletar(usuario.id).then(response=>
    {
        console.log("RESPONSE",response)
        handlePage(null);
        setMensagens([{field:"alert alert-success",texto:"Usuário deletado com sucesso!"}])
    })
    .catch(error=>
    {
        console.log(error)
        setMensagens([{field:"alert alert-danger",texto:"Houve um erro ao deletar o usuário!"}])
    })
}

  useEffect(() => {
    service
      .pages()
      .then((result) => {
        setUsuarios({ ...result, first: 0 });
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

    return(
        <Layout
        titulo="Listagem de Usuários"
        tittleClassName="h1 display-6 fw-bold text-primary mt-4 text-center"
        mensagens={mensagens}
      >
        <ListagemUsuariosTabela handlePage={handlePage} onDelete={deletar} usuarios={usuarios}/>
      </Layout>

    )
}