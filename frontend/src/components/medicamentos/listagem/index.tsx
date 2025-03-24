import { Column } from "primereact/column";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Page } from "../../../app/models/common/page";
import { Medicamento } from "../../../app/models/medicamentos";
import { useMedicamentoService } from "../../../app/services/medicamentos.service";
import { Layout } from "../../layout";
import "./index.css";
export const ListagemMedicamentos:React.FC = () =>
{
    const[medicamentos,setMedicamentos] = useState<Page<Medicamento>>({
        content:[],
        first:0,
        number:0,
        size:10,
        totalElements:0,
    })
    console.log(medicamentos)
    const service = useMedicamentoService()
    const handlePage = (event:DataTableStateEvent | null)=>
    {
        service.pages(event?.page,event?.rows).
        then(result=>
        {
            setMedicamentos({...result, first: event?.first ?? 0 })
        }).catch(error=>
        {
            console.log(error)
        })
    }

   useEffect(() => {
    service.pages(0, 10)
        .then(result => {
            setMedicamentos({ ...result, first: 0 });
        })
        .catch(error => console.error("Erro ao buscar dados:", error));
}, []);


    return(
        <Layout titulo="Listagem de medicamentos" tittleClassName="h1 display-6 fw-bold text-primary mt-4 text-center">
            <div>
            <DataTable 
                value={medicamentos.content}
                totalRecords={medicamentos.totalElements}
                lazy
                paginator
                first={medicamentos.first}
                rows={medicamentos.size}
                onPage={handlePage}
                emptyMessage="Nenhum registro encontrado"
                className="table"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                rowsPerPageOptions={[5, 10, 20]}
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
                paginatorClassName="custom-paginator"
            >

                        <Column field="id" header="ID"/>
                        <Column field="medicamento" header="Nome do Medicamento"/>
                </DataTable>
    
            </div>
        </Layout>
    )
}