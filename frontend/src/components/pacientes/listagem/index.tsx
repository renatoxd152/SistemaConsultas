import { DataTableStateEvent } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Page } from "../../../app/models/common/page";
import { Paciente } from "../../../app/models/pacientes";
import { usePacienteService } from "../../../app/services/pacientes.service";
import { Alert } from "../../common/mensagem";
import { Layout } from "../../layout";
import { TabelaPacientes } from "./tabela";

export const ListagemPacientes:React.FC= () =>
{
    const[mensagens,setMensagens] = useState<Array<Alert>>([])
    const service = usePacienteService();
    const [pacientes, setPacientes] = useState<Page<Paciente>>({
        content: [],
        first: 0,
        number: 0,
        size: 10,
        totalElements: 0,
    });
       
        const deletar = (paciente:Paciente)=>
        {
            service.deletar(paciente.id).then(response=>
            {
                handlePage(null);
                setMensagens([{field:"alert alert-success",texto:"Paciente deletado com sucesso!"}])
            })
            .catch(error=>
            {
                setMensagens([{field:"alert alert-danger",texto:"Houve um erro ao deletar o paciente!"}])
            })
        }
    
          const handlePage = (event: DataTableStateEvent| null) => {
            service
              .pages(event?.page, event?.rows)
              .then((result) => {
                setPacientes({ ...result, first: event?.first ?? 0 });
              })
              .catch((error) => {
                console.log(error);
              });
          };
    
           useEffect(() => {
              service
                .pages(0, 10)
                .then((result) => {
                  setPacientes({ ...result, first: 0 });
                })
                .catch((error) => console.error("Erro ao buscar dados:", error));
            }, []);
    return(
        <Layout titulo="Listagem de Pacientes" tittleClassName="h1 display-6 fw-bold text-primary mt-4" className="text-center" mensagens={mensagens}>
            <TabelaPacientes onDelete={deletar} pacientes={pacientes || []} handlePage={handlePage}/>
        </Layout>
    )
}