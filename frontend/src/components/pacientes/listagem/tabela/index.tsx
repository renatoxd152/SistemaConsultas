import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../../../app/models/common/page";
import { Paciente } from "../../../../app/models/pacientes";
import { Loader } from "../../../loader";
interface TabelaPacientesProps {
  pacientes:Page<Paciente>;
  onDelete: (paciente:Paciente) => void;
  handlePage: (event: DataTableStateEvent) => void; 
}
export const TabelaPacientes: React.FC<TabelaPacientesProps> = ({
  pacientes,
  onDelete,
  handlePage
}) => {
   const navigate = useNavigate() 
  const confirmarDelecao = (event: React.MouseEvent, paciente:Paciente) => {
    confirmPopup({
      target: event.currentTarget as HTMLElement,
      message: "Tem certeza que deseja excluir o paciente?",
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptClassName: 'p-button-danger', 
      accept: () => onDelete(paciente),
    });
  };

  const leftToolbarTemplate  = () => {
    return (
        <div className="flex flex-wrap gap-2">
            <Button label="Adicionar novo Paciente" icon="pi pi-plus" severity="success" onClick={() => navigate("/pacientes")} />
            
        </div>
    );
};
  const actionTemplate = (paciente:Paciente)=>
    {
        
        const url = `/pacientes/editar/${paciente.id}`
        return(
            <div>
                <Button 
                label="Deletar "  
                className="btn btn-danger btn-sm m-1" 
                onClick={(e) => confirmarDelecao(e, paciente)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
              <Button label="Editar " className="btn btn-primary btn-sm m-1" onClick={() => navigate(url)}>
              <FontAwesomeIcon icon={faEdit} />
              </Button>
            </div>
        )
    }
  return (
    
    <div className="table-responsive">
            <Loader show={!pacientes}/>
           <ConfirmPopup />
           
                
            <Toolbar className="mb-4" start={leftToolbarTemplate}></Toolbar>   
            <DataTable
            value={pacientes.content}
            totalRecords={pacientes.totalElements}
            lazy
            paginator
            first={pacientes.first}
            rows={pacientes.size}
            onPage={handlePage}
            emptyMessage="Nenhum registro encontrado"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            rowsPerPageOptions={[5, 10, 20]}
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
            paginatorClassName="custom-paginator"
          >
            <Column field="id" header="ID" />
            <Column field="nome" header="Nome"  />
            <Column field="rg" header="RG"/>
            <Column field="cpf" header="CPF" />
            <Column
              header="Data Nascimento"
              body={(rowData) => {
                const data = new Date(rowData.dataNascimento);
                return data.toLocaleDateString("pt-BR");
              }}/>
           
            <Column header="" body={actionTemplate}/>
    
          </DataTable>
    </div>
  );
};