import { Column } from "primereact/column";
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import React, { useState } from "react";
import { Page } from "../../../app/models/common/page";
import { Consulta } from "../../../app/models/consultas";
import { useConsultaService } from "../../../app/services/consultas.service";
import { Layout } from "../../layout";
export const ListagemConsultas: React.FC = () =>
{

    const service = useConsultaService();
    
    const[consultas,setConsultas] = useState<Page<Consulta>>({
        content:[],
        first:0,
        number:0,
        size:10,
        totalElements:0
    })

    const handlePage = (event:DataTableStateEvent | null) =>
    {
        service.listar().then(result=>
        {
            setConsultas({...result,first:event?.first??0})
        })
    }
    return(
        <Layout titulo="Listagem de consultas">
            <DataTable value={consultas.content} totalRecords={consultas.totalElements}
             lazy paginator first={consultas.first} rows={consultas.size} onPage={handlePage} 
             emptyMessage="Nenhum registro encontrado">
                <Column field="id" header="Código"/>
                <Column field="medico" header="Médico"/>
                <Column field="paciente" header="Paciente"/>
                <Column field="data" header="Data/Horário"/>
                <Column field="motivo" header="Motivo"/>
                <Column field="prescricao" header="Prescrição Médica"/>

            </DataTable>
        </Layout>
    )
}