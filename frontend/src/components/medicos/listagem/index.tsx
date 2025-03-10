import { Column } from "primereact/column";
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import React, { useState } from "react";
import { Page } from "../../../app/models/common/page";
import { Medico } from "../../../app/models/medicos";
import { useMedicoService } from "../../../app/services/medicos.service";
import { Layout } from "../../layout";
export const Listagem: React.FC = () =>
{

    const service = useMedicoService();
    
    const[medicos,setMedicos] = useState<Page<Medico>>({
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
            setMedicos({...result,first:event?.first??0})
        })
    }
    return(
        <Layout titulo="Listagem de médicos" tittleClassName="h1 display-6 fw-bold text-primary mt-4" className="text-center">
            <DataTable value={medicos.content} totalRecords={medicos.totalElements}
             lazy paginator first={medicos.first} rows={medicos.size} onPage={handlePage} 
             emptyMessage="Nenhum registro encontrado">
                <Column field="id" header="Código"/>
                <Column field="nome" header="Nome"/>
                <Column field="telefone" header="Telefone"/>
                <Column field="email" header="Email"/>
                <Column field="numeroCRM" header="Número CRM"/>
                <Column field="especialidade" header="Especialidade"/>

            </DataTable>
        </Layout>
    )
}