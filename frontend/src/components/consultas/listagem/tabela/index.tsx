import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import React from "react";
import { Consulta } from "../../../../app/models/consultas";

interface TabelaConsultasProps {
  consultas: Array<Consulta>;
  onDelete: (consulta: Consulta) => void;
}

export const TabelaConsultas: React.FC<TabelaConsultasProps> = ({
  consultas,
  onDelete,
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered shadow-sm rounded">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Médico</th>
            <th>Paciente</th>
            <th>Data</th>
            <th>Motivo</th>
            <th>Prescrição Médica</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta) => (
            <ConsultaRow key={consulta.id} consulta={consulta} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface ConsultaRowProps {
  consulta: Consulta;
  onDelete: (consulta: Consulta) => void;
}

const ConsultaRow: React.FC<ConsultaRowProps> = ({ consulta, onDelete }) => {
  return (
    <tr className="text-center align-middle" style={{cursor:'pointer'}}>
      <td>{consulta.id}</td>
      <td>{consulta.medico.nome}</td>
      <td>{consulta.paciente.nome}</td>
      <td>{format(consulta.data, "dd/MM/yyyy")}</td>
      <td>{consulta.motivo}</td>
      <td>{consulta.prescricaoMedica}</td>
      <td>
        <button
          onClick={() => onDelete(consulta)}
          className="btn btn-danger btn-sm d-flex align-items-center gap-2 mx-auto"
        >
          <FontAwesomeIcon icon={faTrash} /> Deletar
        </button>
      </td>
    </tr>
  );
};
