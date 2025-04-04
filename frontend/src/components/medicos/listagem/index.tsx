import { Column } from "primereact/column";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Page } from "../../../app/models/common/page";
import { Medico } from "../../../app/models/medicos";
import { useMedicoService } from "../../../app/services/medicos.service";
import { Layout } from "../../layout";

export const Listagem: React.FC = () => {
  const service = useMedicoService();

  const [medicos, setMedicos] = useState<Page<Medico>>({
    content: [],
    first: 0,
    number: 0,
    size: 10,
    totalElements: 0,
  });

  const handlePage = (event: DataTableStateEvent | null) => {
    service
      .pages(event?.page, event?.rows)
      .then((result) => {
        setMedicos({ ...result, first: event?.first ?? 0 });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    service
      .pages(0, 10)
      .then((result) => {
        setMedicos({ ...result, first: 0 });
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  return (
    <Layout
      titulo="Listagem de Médicos"
      tittleClassName="h1 display-6 fw-bold text-primary mt-4"
      className="text-center"
    >
      <div className="container mt-4">
        <div className="card shadow rounded-3">
          <div className="card-header bg-primary text-white text-center fw-bold">
            Listagem de Médicos
          </div>
          
            <DataTable
              value={medicos.content}
              totalRecords={medicos.totalElements}
              lazy
              paginator
              first={medicos.first}
              rows={medicos.size}
              onPage={handlePage}
              emptyMessage="Nenhum registro encontrado"
              className="table"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              rowsPerPageOptions={[5, 10, 20]}
              currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
              paginatorClassName="custom-paginator"
            >
              <Column field="id" header="Código" />
              <Column field="nome" header="Nome" />
              <Column field="telefone" header="Telefone" />
              <Column field="email" header="Email" />
              <Column field="numeroCRM" header="Número CRM" />
              <Column field="especialidade" header="Especialidade" />
            </DataTable>
          
        </div>
      </div>
    </Layout>
  );
};
