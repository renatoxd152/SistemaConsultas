import { format } from 'date-fns';
import React from "react";
import { Consulta } from "../../../../app/models/consultas";
interface TabelaConsultasProps
{
    consultas:Array<Consulta>;
    onDelete:(consulta:Consulta)=>void;
}
export const TabelaConsultas:React.FC<TabelaConsultasProps>= (
    {
        consultas,
        onDelete

    }
)=>
{
    return(
       <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Médico</th>
                    <th>Paciente</th>
                    <th>Data</th>
                    <th>Motivo</th>
                    <th>Prescrição Médica</th>
                </tr>
            </thead>
            <tbody>
                {
                    consultas.map(consulta=><ConsultaRow key={consulta.id} consulta={consulta} onDelete={onDelete}/>)
                }
            </tbody>
       </table>
    )
}
interface ConsultaRowProps{
    consulta:Consulta;
    onDelete:(consulta:Consulta)=>void;
}
const ConsultaRow:React.FC<ConsultaRowProps>=(
    {
        consulta,
        onDelete
    }
)=>
{

    return(
        <tr>
            <td>
                {consulta.id}
            </td>
            <td>{consulta.medico.nome}</td>
            <td>{consulta.paciente.nome}</td>
            <td>{format(consulta.data,"dd/MM/yyyy")}</td>
            <td>{consulta.motivo}</td>
            <td>{consulta.prescricaoMedica}</td>
            <td>
                <button onClick={e=>onDelete(consulta)} className="btn btn-danger">
                    Deletar
                </button>
            </td>
        </tr>
    )
}