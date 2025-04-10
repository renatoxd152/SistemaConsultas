import { DataTableStateEvent } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Page } from "../../../app/models/common/page";
import { Medicamento } from "../../../app/models/medicamentos";
import { useMedicamentoService } from "../../../app/services/medicamentos.service";
import { Alert } from "../../common/mensagem";
import { Layout } from "../../layout";
import { ListagemMedicamentosTabela } from "./tabela";

export const ListagemMedicamentos:React.FC = () =>
{
      const service = useMedicamentoService();
      const[mensagens,setMensagens] = useState<Array<Alert>>([])
      const [medicamentos, setMedicamentos] = useState<Page<Medicamento>>({
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
        setMedicamentos({ ...result, first: event?.first ?? 0 });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletar = (medicamento:Medicamento)=>
{
    service.deletar(medicamento.id).then(response=>
    {
        handlePage(null);
        setMensagens([{field:"alert alert-success",texto:"Medicamento deletado com sucesso!"}])
    })
    .catch(error=>
    {
        setMensagens([{field:"alert alert-danger",texto:"Houve um erro ao deletar o medicamento!"}])
    })
}

  useEffect(() => {
    service
      .pages(0, 10)
      .then((result) => {
        setMedicamentos({ ...result, first: 0 });
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

    return(
        <Layout
        titulo="Listagem de Medicamentos"
        tittleClassName="h1 display-6 fw-bold text-primary mt-4 text-center"
        mensagens={mensagens}
      >
        <ListagemMedicamentosTabela handlePage={handlePage} onDelete={deletar} medicamentos={medicamentos}/>
      </Layout>

    )
}