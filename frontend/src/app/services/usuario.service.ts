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
  
    return{
        salvar,
        login
    }
}