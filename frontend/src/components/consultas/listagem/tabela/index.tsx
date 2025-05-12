import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FilterMatchMode } from 'primereact/api';
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { DataTable, DataTableFilterMeta, DataTableStateEvent } from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../../../app/models/common/page";
import { Consulta } from "../../../../app/models/consultas";
import { Loader } from "../../../loader";
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
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });


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

  const navigate = useNavigate()
  const leftToolbarTemplate  = () => {
      return (
          <div className="flex flex-wrap gap-2">
              <Button label="Adicionar nova consulta" icon="pi pi-plus" severity="success" onClick={() => navigate("/consultas")} />
              
          </div>
      );
  };


  
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
  
    (_filters['global'] as { value: any }).value = value;
  
    setFilters(_filters);
    setGlobalFilterValue(value);

      const fakeEvent: DataTableStateEvent = {
      first: 0,
      rows: 10,
      page: 0,
      filters: {
        global: { value: value, matchMode: FilterMatchMode.CONTAINS }
      },
      sortField: '',
      sortOrder: 0,
      multiSortMeta: null
    };

    handlePage(fakeEvent);
  };
  const renderHeader = () => {
    return (
        <div className="flex justify-content-end">
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Procure o médico ou paciente..." className="w-25"/>
            </IconField>
        </div>
    );
};
  
  return (
    <div className="table-responsive">
           <ConfirmPopup />

            <Loader show={!consultas}/>
            <Toolbar className="mb-4" start={leftToolbarTemplate}></Toolbar>   
            <DataTable
            value={consultas.content}
            totalRecords={consultas.totalElements}
            lazy
            paginator
            first={consultas.first}
            rows={consultas.size}
            onPage={handlePage}
            emptyMessage="Nenhum registro encontrado"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            rowsPerPageOptions={[5, 10, 20]}
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
            paginatorClassName="custom-paginator"
            header={renderHeader()}
            filters={filters}
          >
            <Column field="id" header="ID" />
            <Column field="medico" header="Médico" body={(rowData) => rowData.medico?.nome} />
            <Column field="paciente" header="Paciente" body={(rowData) => rowData.paciente?.nome} />
            <Column
              header="Data"
              body={(rowData) => {
                const data = new Date(rowData.data);
                return data.toLocaleDateString("pt-BR");
              }}/>
            <Column field="prescricaoMedica" header="Prescrição Médica" />
            <Column
            header="Status"
            body={(rowData) => {
              const status = rowData.status as 1 | 2 | 3;

              const statusMap: { [key in 1 | 2 | 3]: { text: string; color: string } } = {
                1: { text: "Agendado", color: "#007bff" },   
                2: { text: "Realizado", color: "#28a745" },  
                3: { text: "Cancelado", color: "#dc3545" },
              };

              const { text, color } = statusMap[status] || { text: "Desconhecido", color: "#6c757d" };

              return (
                <span
                  style={{
                    backgroundColor: color,
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                    display: "inline-block",
                    minWidth: "90px",
                    textAlign: "center"
                  }}
                >
                  {text}
                </span>
              );
            }}
          />

            <Column header="" body={actionTemplate}/>
    
          </DataTable>
    </div>
  );
};