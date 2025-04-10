import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import React from "react";
import { Page } from "../../../../app/models/common/page";
import { Consulta } from "../../../../app/models/consultas";
interface TabelaConsultasProps {
  consultas:Page<Consulta>;
  onDelete: (consulta: Consulta) => void;
  handlePage: (event: DataTableStateEvent) => void; 
}
export const TabelaConsultas: React.FC<TabelaConsultasProps> = ({
  consultas,
  onDelete,
  handlePage
}) => {
  const confirmarDelecao = (event: React.MouseEvent, consulta:Consulta) => {
    confirmPopup({
      target: event.currentTarget as HTMLElement,
      message: "Tem certeza que deseja excluir a consulta?",
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptClassName: 'p-button-danger', 
      accept: () => onDelete(consulta),
    });
  };
  const actionTemplate = (consulta:Consulta)=>
    {
        return(
            <div>
                <Button 
                label="Deletar"  
                className="btn btn-danger btn-sm" 
                onClick={(e) => confirmarDelecao(e, consulta)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
        )
    }
  return (
    <div className="table-responsive">
           <ConfirmPopup />
            <DataTable
            value={consultas.content}
            totalRecords={consultas.totalElements}
            lazy
            paginator
            first={consultas.first}
            rows={consultas.size}
            onPage={handlePage}
            emptyMessage="Nenhum registro encontrado"
            className="table"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            rowsPerPageOptions={[5, 10, 20]}
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
            paginatorClassName="custom-paginator"
          >
            <Column field="id" header="ID" />
            <Column header="Médico" body={(rowData) => rowData.medico?.nome} />
            <Column header="Paciente" body={(rowData) => rowData.paciente?.nome} />
            <Column
              header="Data"
              body={(rowData) => {
                const data = new Date(rowData.data);
                return data.toLocaleDateString("pt-BR");
              }}/>
            <Column field="prescricaoMedica" header="Prescrição Médica" />
            <Column header="" body={actionTemplate}/>
    
          </DataTable>
    </div>
  );
};