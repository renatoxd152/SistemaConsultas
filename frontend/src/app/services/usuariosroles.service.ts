import { AxiosResponse } from 'axios'
import { httpClient } from '../htpp'
import { Page } from "../models/common/page"
import { UsuariosRoles } from '../models/usuarioroles'
const resourceURL:string = "/api/usuarios"
export const useUsuariosRolesService = () =>
{
     const pages = async():Promise<Page<UsuariosRoles>> =>
        {
            const response: AxiosResponse<Page<UsuariosRoles>> = await httpClient.get(resourceURL);
            return response.data;
        }

        const deletar = async (id:any) : Promise<void> =>
        {
            const url:string = `${resourceURL}/${id}`
            await httpClient.delete(url);
        }
         

    return{
        pages,
        deletar
    }
}