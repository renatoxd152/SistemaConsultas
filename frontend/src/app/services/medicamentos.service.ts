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
    const listar = async(): Promise<Medicamento[]> =>
    {
        const response:AxiosResponse<Medicamento[]> = await httpClient.get(resourceURL);
        return response.data;
    }

    const pages = async( page:number =0,
        size:number =10,sortField?:string,sortOrder?:number | null):Promise<Page<Medicamento>> =>
    {
        let url = `${resourceURL}/listar/paginas?page=${page}&size=${size}`

        if (sortField) {
            const direction = sortOrder === 1 ? 'asc' : 'desc';
            url += `&sort=${sortField},${direction}`;
          }

        const response: AxiosResponse<Page<Medicamento>> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (id:any) : Promise<void> =>
    {
        const url:string = `${resourceURL}/${id}`
        await httpClient.delete(url);
    }
    const atualizar = async (medicamento:Medicamento) : Promise<void> =>
    {
        const url:string = `${resourceURL}/${medicamento.id}`;
        await httpClient.put<Medicamento>(url,medicamento);
    }

    const getById = async (id:number) :Promise<Medicamento>=>
    {
        const url = `${resourceURL}/${id}`;
        const response:AxiosResponse<Medicamento> = await httpClient.get(url);
        return response.data;
    }
    return{
        salvar,
        listar,
        pages,
        deletar,
        atualizar,
        getById
    }
}