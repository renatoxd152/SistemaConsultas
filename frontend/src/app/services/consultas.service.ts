import { AxiosResponse } from 'axios'
import { httpClient } from '../htpp'
import { Page } from "../models/common/page"
import { Consulta } from '../models/consultas'
const resourceURL:string = "/api/medicos"
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

    return{
        salvar,
        listar
    }
}