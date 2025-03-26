import { format } from 'date-fns';
import React from "react";
import { Paciente } from '../../../../app/models/pacientes';
interface TabelaPacienteProps
{
    pacientes:Array<Paciente>;
    onDelete:(paciente:Paciente)=>void;
}
export const TabelaPacientes:React.FC<TabelaPacienteProps>= (
    {
        pacientes,
        onDelete
    }
)=>
{
    return(
       <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>RG</th>
                    <th>CPF</th>
                    <th>Data de Nascimento</th>
                </tr>
            </thead>
            <tbody>
                {
                    pacientes.map(paciente=><PacienteRow key={paciente.id} paciente={paciente} onDelete={onDelete}/>)
                }
            </tbody>
       </table>
    )
}
interface PacienteRowProps{
    paciente:Paciente;
    onDelete:(paciente:Paciente)=>void;
}
const PacienteRow:React.FC<PacienteRowProps>=(
    {
        paciente,
        onDelete
    }
)=>
{

    return(
        <tr>
            <td>
                {paciente.id}
            </td>
            <td>{paciente.nome}</td>
            <td>{paciente.rg}</td>
            <td>{paciente.cpf}</td>
            <td>{format(paciente.dataNascimento,"dd/MM/yyyy")}</td>
            
            <td>
                <button onClick={e=>onDelete(paciente)} className="btn btn-danger">
                    Deletar
                </button>
            </td>
        </tr>
    )
}