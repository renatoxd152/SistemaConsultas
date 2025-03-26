import { AxiosResponse } from 'axios'
import { httpClient } from '../htpp'
import { Page } from "../models/common/page"
import { Paciente } from '../models/pacientes'
const resourceURL:string = "/api/pacientes"
export const usePacienteService = () =>
{
    const salvar = async (medico:Paciente) =>
    {
        const response: AxiosResponse<Paciente> = await httpClient.post<Paciente>(resourceURL,medico);
        return response.data;
    }
    const listar = async(): Promise<Paciente[]> =>
    {
        const response:AxiosResponse<Paciente[]> = await httpClient.get(resourceURL);
        return response.data;
    }

     const pages = async( page:number =0,
            size:number =10):Promise<Page<Paciente>> =>
        {
            const url = `${resourceURL}/listar/paginas?page=${page}&size=${size}`
            const response: AxiosResponse<Page<Paciente>> = await httpClient.get(url);
            return response.data;
        }

        const getById = async (id:number) :Promise<Paciente>=>
        {
            const url = `${resourceURL}/${id}`;
            const response:AxiosResponse<Paciente> = await httpClient.get(url);
            return response.data;
        }

        const deletar = async (id:any) : Promise<void> =>
        {
            const url:string = `${resourceURL}/${id}`
            await httpClient.delete(url);
        }

       

    return{
        salvar,
        listar,
        pages,
        getById,
        deletar
    }
}