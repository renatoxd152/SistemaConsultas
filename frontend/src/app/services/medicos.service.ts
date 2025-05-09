import { AxiosResponse } from 'axios'
import { httpClient } from '../htpp'
import { Page } from "../models/common/page"
import { Medico } from "../models/medicos/index"
const resourceURL:string = "/api/medicos"
export const useMedicoService = () =>
{
    const salvar = async (medico:Medico) =>
    {
        const response: AxiosResponse<Medico> = await httpClient.post<Medico>(resourceURL,medico);
        return response.data;
    }
    const listar = async(): Promise<Medico[]> =>
    {
        const response:AxiosResponse<Medico[]> = await httpClient.get(resourceURL);
        return response.data;
    }
    const getById = async (id:number) :Promise<Medico>=>
    {
        const url = `${resourceURL}/${id}`;
        const response:AxiosResponse<Medico> = await httpClient.get(url);
        return response.data;
    }

     const pages = async( page:number =0,
            size:number =10):Promise<Page<Medico>> =>
        {
            const url = `${resourceURL}/listar/paginas?page=${page}&size=${size}`
            const response: AxiosResponse<Page<Medico>> = await httpClient.get(url);
            return response.data;
        }

    const deletar = async (id:any) : Promise<void> =>
    {
        const url:string = `${resourceURL}/${id}`
        await httpClient.delete(url);
    }
    const atualizar = async (medico:Medico) : Promise<void> =>
    {
        const url:string = `${resourceURL}/${medico.id}`;
        await httpClient.put<Medico>(url,medico);
    }
        

    return{
        salvar,
        listar,
        pages,
        getById,
        deletar,
        atualizar
    }
}