export interface Usuario
{
    id?:number;
    login?:string;
    senha?:string;
    senhaConfirmar?:string;
    senhaAnterior?:string;
    nivel?:string;
    role?:string;
    token?:string;
}