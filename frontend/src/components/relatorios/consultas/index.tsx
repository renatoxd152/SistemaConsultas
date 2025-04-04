import { format, parseISO } from 'date-fns';
import React from "react";
import { useConsultaService } from "../../../app/services/consultas.service";
import { Layout } from "../../layout";
import { FormDataProps, RelatorioConsultasForm } from "./form";

export const RelatorioConsultas:React.FC = () =>
{
    const service = useConsultaService();
    const handleSubmit = (form:FormDataProps) =>
    {
        const dataInicialFormatada = format(parseISO(form.dataInicial), 'dd/MM/yyyy');
        const dataFinalFormatada = format(parseISO(form.dataFinal), 'dd/MM/yyyy');
        service.gerarRelatorioVendas(dataInicialFormatada,dataFinalFormatada).then(blob=>
        {
            const fileURL = URL.createObjectURL(blob);
            window.open(fileURL);
        })
    }
    return(
        <Layout titulo="Relatório de consultas médicas" tittleClassName="h1 display-6 fw-bold text-primary mt-4" className="text-center">
            <RelatorioConsultasForm onSubmit={handleSubmit}/>
        </Layout>
    )
     
     
}