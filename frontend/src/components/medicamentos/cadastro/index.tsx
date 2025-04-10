import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Medicamento } from "../../../app/models/medicamentos";
import { useMedicamentoService } from "../../../app/services/medicamentos.service";
import { Alert } from "../../common/mensagem";
import { Layout } from "../../layout";
import { CadastroMedicamentoForm } from "./form";

export const CadastroMedicamento:React.FC = () =>
{
    const service = useMedicamentoService();
    const[mensagens,setMensagens] = useState<Array<Alert>>([])
    const[medicamento,setMedicamento] = useState<Medicamento>({})
    const{id} = useParams()
     useEffect(() => {
        if (id) {
            service.getById(parseInt(id)).then((medicamentoEncontrado) => {
                setMedicamento(medicamentoEncontrado);
            });
        }
    }, [id]);
    const handleSubmit = (medicamento:Medicamento) =>
    {
        if(medicamento.id)
        {
            service.atualizar(medicamento).then(()=>
            {
                setMensagens([{field:"alert alert-success",texto:"Medicamento atualizado com sucesso!"}])
            })
        }
        else
        {
            service.salvar(medicamento).then(response=>
            {
                setMensagens([{field:"alert alert-success",texto:"Medicamento salvo com sucesso!"}])
            }).catch(error=>
            {
                console.log("ERRO AO SALVAR MEDICAMENTO:",error)
                setMensagens([{field:"alert alert-danger",texto:"Houve um erro ao salvar o medicamento!"}])
            }
            )
        }
    }
    return(
        <Layout titulo={medicamento.id?"Atualizar Medicamento":"Cadastro de Medicamentos"} tittleClassName="h1 display-6 fw-bold text-primary mt-4 text-center" mensagens={mensagens}>
            <CadastroMedicamentoForm onSubmit={handleSubmit} medicamento={medicamento}/>
        </Layout>
    )
}