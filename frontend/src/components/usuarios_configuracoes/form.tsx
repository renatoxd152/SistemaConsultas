import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmPopup, ConfirmPopup } from 'primereact/confirmpopup';
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import React from "react";
import { Page } from "../../app/models/common/page";
import { UsuariosRoles } from "../../app/models/usuarioroles";
interface ListagemUsuariosProps
{
  onDelete:(usuario:UsuariosRoles)=>void;
  handlePage: (event: DataTableStateEvent) => void; 
  usuarios:Page<UsuariosRoles>;
}
export const ListagemUsuariosTabela: React.FC<ListagemUsuariosProps> = (
  {
    onDelete,
    handlePage,
    usuarios
  }
) => {


   const confirmarDelecao = (event: React.MouseEvent, usuario:UsuariosRoles) => {
      confirmPopup({
        target: event.currentTarget as HTMLElement,
        message: "Tem certeza que deseja excluir o usuário?",
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        acceptClassName: 'p-button-danger', 
        accept: () => onDelete(usuario),
      });
    };
const actionTemplate = (usuario:UsuariosRoles)=>
    {
        return(
            <div>
                <Button
                label="Deletar "  
                className="btn btn-danger btn-sm" 
                onClick={(e) => confirmarDelecao(e, usuario)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
        )
    }

  return (
      <div className="container mt-4">
        <div className="card shadow rounded-3">
          
          <div className="card-header bg-primary text-white text-center fw-bold">
            Listagem de Usuários
          </div>
          
         <ConfirmPopup />
            <DataTable
              value={usuarios.content}
              totalRecords={usuarios.totalElements}
              lazy
              paginator
              first={usuarios.first}
              rows={usuarios.size}
              onPage={handlePage}
              emptyMessage="Nenhum registro encontrado"
              className="table"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              rowsPerPageOptions={[5, 10, 20]}
              currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
              paginatorClassName="custom-paginator"
            >
              <Column field="id" header="ID" />
              <Column field="role" header="Nível de usuário" />
              <Column field="login" header="Login de usuário" />
              <Column header="" body={actionTemplate}/>
            </DataTable>
        </div>
      </div>
  );
};
