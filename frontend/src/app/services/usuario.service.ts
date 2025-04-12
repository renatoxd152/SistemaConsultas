import { AxiosResponse } from 'axios'
import { httpClient } from '../htpp'
import { Usuario } from '../models/usuarios'

const resourceURL:string = "/api/usuarios"
export const useUsuarioService = () =>
{
    const salvar = async (usuario:Usuario) =>
    {
        const response: AxiosResponse<Usuario> = await httpClient.post<Usuario>(resourceURL,usuario);
        return response.data;
    }
    const login = async(usuario:Usuario)=>
    {
        const url = `${resourceURL}/login`;
        const response: AxiosResponse<Usuario> = await httpClient.post<Usuario>(url,usuario);
        return response.data;
    }
   const getById = async (id:number) :Promise<Usuario>=>
    {
        const url = `${resourceURL}/${id}`;
        const response:AxiosResponse<Usuario> = await httpClient.get(url);
        return response.data;
    }

     const atualizar = async (usuario:Usuario) : Promise<void> =>
    {
        const url:string = `${resourceURL}/${usuario.id}`;
        await httpClient.put<Usuario>(url,usuario);
    }
  
    return{
        salvar,
        login,
        getById,
        atualizar
    }
}