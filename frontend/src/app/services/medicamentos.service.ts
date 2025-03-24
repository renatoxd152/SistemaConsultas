import { AxiosResponse } from 'axios'
import { httpClient } from '../htpp'
import { Page } from "../models/common/page"
import { Medicamento } from '../models/medicamentos'
const resourceURL:string = "/api/medicamentos"
export const useMedicamentoService = () =>
{
    const salvar = async (medicamento:Medicamento) =>
    {
        const response: AxiosResponse<Medicamento> = await httpClient.post<Medicamento>(resourceURL,medicamento);
        return response.data;
    }
    const listar = async(): Promise<Page<Medicamento>> =>
    {
        const response:AxiosResponse<Page<Medicamento>> = await httpClient.get(resourceURL);
        return response.data;
    }

    const pages = async( page:number =0,
        size:number =10):Promise<Page<Medicamento>> =>
    {
        const url = `${resourceURL}/listar/paginas?page=${page}&size=${size}`
        const response: AxiosResponse<Page<Medicamento>> = await httpClient.get(url);
        return response.data;
    }

    return{
        salvar,
        listar,
        pages
    }
}