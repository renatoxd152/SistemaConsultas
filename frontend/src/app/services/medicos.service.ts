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
    const listar = async(): Promise<Page<Medico>> =>
    {
        const response:AxiosResponse<Page<Medico>> = await httpClient.get(resourceURL);
        return response.data;
    }

    return{
        salvar,
        listar
    }
}