export interface Usuario
{
    id:number;
    login:string;
    senha:string;
    senhaConfirmar?:string;
    nivel:string;
    role?:string;
}