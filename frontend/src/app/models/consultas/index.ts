import { Medico } from "../medicos";
import { Paciente } from "../pacientes";

export interface Consulta
{
    id:string;
    medico:Medico;
    paciente:Paciente;
    data:Date;
    hora:string;
    motivo:string;
    tipo:string;
    status:string;
    observacoes:string;
    prescricaoMedica:string;
}