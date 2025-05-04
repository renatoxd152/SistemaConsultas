import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../../app/models/common/page";
import { Medico } from "../../../app/models/medicos";
import { useMedicoService } from "../../../app/services/medicos.service";
import { Alert } from "../../common/mensagem";
import { Layout } from "../../layout";
import { Loader } from "../../loader";
export const Listagem: React.FC = () => {
  const service = useMedicoService();
  const[mensagens,setMensagens] = useState<Array<Alert>>([])
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

  const deletar = (medico:Medico)=>
    {
        service.deletar(medico.id).then(result=>
        {
            handlePage(null)
        })
        .catch(error=>
        {
          setMensagens([{field:"alert alert-danger",texto:"Houve um erro ao deletar o médico"}])
        }
        )
    }
  const navigate = useNavigate()

  const confirmarDelecao = (event: React.MouseEvent, medico: Medico) => {
    confirmPopup({
      target: event.currentTarget as HTMLElement,
      message: `Tem certeza que deseja excluir o médico "${medico.nome}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptClassName: 'p-button-danger',
      accept: () => deletar(medico),
    });
  };
  
  const actionTemplate = (medico:Medico)=>
    {
        const url = `/medicos/cadastrar/${medico.id}`
        return(
            <div>
                <Button label="Editar"
                className="btn btn-primary btn-sm m-1"
                onClick={()=>navigate(url)}
                > <FontAwesomeIcon icon={faEdit} className="me-2" /></Button>
                
                <Button 
                label="Deletar"  
                className="btn btn-danger btn-sm m-1" 
                onClick={(e) => confirmarDelecao(e, medico)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
        )
    }

    const leftToolbarTemplate  = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Adicionar novo médico" icon="pi pi-plus" severity="success" onClick={() => navigate("/medicos/cadastrar")} />
                
            </div>
        );
    };

  return (
    <Layout
      titulo="Listagem de Médicos"
      tittleClassName="h1 display-6 fw-bold text-primary mt-4"
      className="text-center"
      mensagens={mensagens}
    >
      
      <div className="container mt-4">
      <Toolbar className="mb-4" start={leftToolbarTemplate}></Toolbar>   
        <div className="card shadow rounded-3">
          
          <div className="card-header bg-primary text-white text-center fw-bold">
            Listagem de Médicos
          </div>
          <Loader show={!medicos}/>
          <ConfirmPopup />
            <DataTable
              value={medicos.content}
              totalRecords={medicos.totalElements}
              lazy
              paginator
              first={medicos.first}
              rows={medicos.size}
              onPage={handlePage}
              emptyMessage="Nenhum registro encontrado"
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
              <Column header="" body={actionTemplate}/>
            </DataTable>
          
        </div>
      </div>
    </Layout>
  );
};
