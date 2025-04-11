import { DataTableStateEvent } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Page } from "../../../app/models/common/page";
import { Consulta } from "../../../app/models/consultas";
import { useConsultaService } from "../../../app/services/consultas.service";
import { Alert } from "../../common/mensagem";
import { Layout } from "../../layout";
import { TabelaConsultas } from "./tabela";
export const ListagemConsultas: React.FC = () =>
{
    const[mensagens,setMensagens] = useState<Array<Alert>>([])
    const service = useConsultaService();
    const [consultas, setConsultas] = useState<Page<Consulta>>({
        content: [],
        first: 0,
        number: 0,
        size: 10,
        totalElements: 0,
    });
   console.log(consultas)
    const deletar = (consulta:Consulta)=>
    {
        service.deletar(consulta.id).then(response=>
        {
            handlePage(null);
            setMensagens([{field:"alert alert-success",texto:"Consulta deletada com sucesso!"}])
        })
        .catch(error=>
        {
            setMensagens([{field:"alert alert-danger",texto:"Houve um erro ao deletar a consulta!"}])
        })
    }

      const handlePage = (event: DataTableStateEvent | null) => {
        service
          .pages(event?.page, event?.rows)
          .then((result) => {
            setConsultas({ ...result, first: event?.first ?? 0 });
          })
          .catch((error) => {
            console.log(error);
          });
      };

       useEffect(() => {
          service
            .pages(0, 10)
            .then((result) => {
              setConsultas({ ...result, first: 0 });
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
        }, []);
    
    return(
        <Layout titulo="Listagem de consultas" tittleClassName="h1 display-6 fw-bold text-primary mt-4" className="text-center" mensagens={mensagens}>
            <TabelaConsultas onDelete={deletar} consultas={consultas || [] } handlePage={handlePage}/>
        </Layout>
    )
}