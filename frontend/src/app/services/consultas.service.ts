import { AxiosResponse } from 'axios'
import { httpClient } from '../htpp'
import { Page } from "../models/common/page"
import { Consulta } from '../models/consultas'
const resourceURL:string = "/api/consultas"
export const useConsultaService = () =>
{
    const salvar = async (consulta:Consulta) =>
    {
        const response: AxiosResponse<Consulta> = await httpClient.post<Consulta>(resourceURL,consulta);
        return response.data;
    }
    const listar = async(): Promise<Page<Consulta>> =>
    {
        const response:AxiosResponse<Page<Consulta>> = await httpClient.get(resourceURL);
        return response.data;
    }
    const deletar = async (id:any) : Promise<void> =>
    {
        const url:string = `${resourceURL}/${id}`
        await httpClient.delete(url);
    }

    const gerarRelatorioVendas = async(dataInicial:string,dataFinal:string):Promise<Blob>=>
    {
        const url = `${resourceURL}/relatorio-consultas?inicio=${dataInicial}&fim=${dataFinal}`;
        const response:AxiosResponse= await httpClient.get(url,{responseType:'blob'})  
        const bytes = response.data;
        return new Blob([bytes],{type:'application/pdf'})
    }

    return{
        salvar,
        listar,
        deletar,
        gerarRelatorioVendas
    }
}