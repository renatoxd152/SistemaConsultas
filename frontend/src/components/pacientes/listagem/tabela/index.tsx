import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from 'date-fns';
import React from "react";
import { Paciente } from '../../../../app/models/pacientes';
interface TabelaPacienteProps {
    pacientes: Array<Paciente>;
    onDelete: (paciente: Paciente) => void;
}

export const TabelaPacientes: React.FC<TabelaPacienteProps> = ({ pacientes, onDelete }) => {
    return (
        <div className="container mt-4">
            <div className="card shadow rounded-3">
                <div className="card-header bg-primary text-white text-center fw-bold">
                    Listagem de Pacientes
                </div>
                <div className="card-body p-3">
                    <table className="table table-bordered text-center">
                        <thead className="table-primary">
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>RG</th>
                                <th>CPF</th>
                                <th>Data de Nascimento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientes.length > 0 ? (
                                pacientes.map((paciente) => (
                                    <PacienteRow key={paciente.id} paciente={paciente} onDelete={onDelete} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-muted">Nenhum paciente encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

interface PacienteRowProps {
    paciente: Paciente;
    onDelete: (paciente: Paciente) => void;
}

const PacienteRow: React.FC<PacienteRowProps> = ({ paciente, onDelete }) => {
    return (
        <tr>
            <td>{paciente.id}</td>
            <td>{paciente.nome}</td>
            <td>{paciente.rg}</td>
            <td>{paciente.cpf}</td>
            <td>{format(new Date(paciente.dataNascimento), "dd/MM/yyyy")}</td>
            <td>
                <button onClick={() => onDelete(paciente)} className="btn btn-danger btn-sm">
                     <FontAwesomeIcon icon={faTrash} /> Deletar
                </button>
            </td>
        </tr>
    );
};
