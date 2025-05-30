import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmPopup, ConfirmPopup } from 'primereact/confirmpopup';
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../../../app/models/common/page";
import { Medicamento } from "../../../../app/models/medicamentos";
import { Loader } from "../../../loader";
import "./index.css";
interface ListagemMedicamentosProps
{
  onDelete:(medicamento:Medicamento)=>void;
  handlePage: (event: DataTableStateEvent) => void; 
  medicamentos:Page<Medicamento>;
}
export const ListagemMedicamentosTabela: React.FC<ListagemMedicamentosProps> = (
  {
    onDelete,
    handlePage,
    medicamentos
  }
) => {

  const navigate = useNavigate() 

   const confirmarDelecao = (event: React.MouseEvent, medicamento:Medicamento) => {
      confirmPopup({
        target: event.currentTarget as HTMLElement,
        message: "Tem certeza que deseja excluir o paciente?",
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        acceptClassName: 'p-button-danger', 
        accept: () => onDelete(medicamento),
      });
    };
const actionTemplate = (medicamento:Medicamento)=>
    {
        
        const url = `/medicamentos/editar/${medicamento.id}`
        return(
            <div>
                <Button
                label="Deletar "  
                className="btn btn-danger btn-sm m-1" 
                onClick={(e) => confirmarDelecao(e, medicamento)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
              <Button label="Editar " className="btn btn-primary btn-sm m-1" onClick={() => navigate(url)}>
              <FontAwesomeIcon icon={faEdit} />
              </Button>
            </div>
        )
    }

     const leftToolbarTemplate  = () => {
              return (
                  <div className="flex flex-wrap gap-2">
                      <Button label="Adicionar novo medicamento" icon="pi pi-plus" severity="success" onClick={() => navigate("/medicamentos")} />
                      
                  </div>
              );
          };

  return (
      <div className="container mt-4">
        <Toolbar className="mb-4" start={leftToolbarTemplate}></Toolbar>  
        <div className="card shadow rounded-3">
          
          <div className="card-header bg-primary text-white text-center fw-bold">
            Listagem de Medicamentos
          </div>
          <Loader show={!medicamentos}/>
          
         <ConfirmPopup />
            <DataTable
              value={medicamentos.content}
              totalRecords={medicamentos.totalElements}
              lazy
              paginator
              first={medicamentos.first}
              rows={medicamentos.size}
              onPage={handlePage}
              onSort={handlePage}
              sortField={medicamentos.sortField}
              sortOrder={medicamentos.sortOrder}
              emptyMessage="Nenhum registro encontrado"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              rowsPerPageOptions={[5, 10, 20]}
              currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
              paginatorClassName="custom-paginator"
            >
              <Column field="id" header="ID" />
              <Column field="medicamento" sortable header="Nome do Medicamento" />
              <Column header="" body={actionTemplate}/>
            </DataTable>
        </div>
      </div>
  );
};
