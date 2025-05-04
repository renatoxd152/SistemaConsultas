import { format, parseISO } from 'date-fns';
import React, { useState } from "react";
import { useConsultaService } from "../../../app/services/consultas.service";
import { Layout } from "../../layout";
import { FormDataProps, RelatorioConsultasForm } from "./form";

export const RelatorioConsultas:React.FC = () =>
{
    const[carregando,setCarregando] = useState(false)
    const service = useConsultaService();
    const handleSubmit = (form: FormDataProps) => {
        try {
            setCarregando(true)
            let dataInicialFormatada = '';
            let dataFinalFormatada = '';
    
            if (form.dataInicial) {
                const dataInicial = parseISO(form.dataInicial);
                dataInicialFormatada = format(dataInicial, 'dd/MM/yyyy');
            }
    
            if (form.dataFinal) {
                const dataFinal = parseISO(form.dataFinal);
                dataFinalFormatada = format(dataFinal, 'dd/MM/yyyy');
            }
           
            service.gerarRelatorioVendas(dataInicialFormatada, dataFinalFormatada).then(blob => {
                const fileURL = URL.createObjectURL(blob);
                window.open(fileURL);
            });
        } catch (err) {
            console.error("Erro ao gerar relatório:", err);
            alert("Ocorreu um erro ao processar as datas.");
        }finally{
            setCarregando(false)
        }
    };
    
    return(
        <Layout titulo="Relatório de consultas médicas" tittleClassName="h1 display-6 fw-bold text-primary mt-4" className="text-center">
            <RelatorioConsultasForm onSubmit={handleSubmit} carregando={carregando}/>
        </Layout>
    )
     
     
}