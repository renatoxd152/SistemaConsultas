import { useFormik } from "formik";
import React from "react";
import { Consulta } from "../../../app/models/consultas";
import { Input } from "../../../common/input";
import { Select } from "../../../common/select";
import { validationScheme } from "../validationSchema";
interface ConsultasFormProps{
    onSubmit:(consulta:Consulta)=>void;
}
export const ConsultasForm:React.FC<ConsultasFormProps> = ({
    onSubmit
}) =>
{
    interface Opcao{
        value:string;
        label:string;
    }
    const medicos: Opcao[] = [
        {
            value: "1",
            label: "Dr. João Silva",
        },
        {
            value: "2",
            label: "Dra. Maria Oliveira",
        },
        {
            value: "3",
            label: "Dr. Pedro Santos",
        }
    ];

    const pacientes: Opcao[] = [
        {
            value: "1",
            label: "Dr. João Silva",
        },
        {
            value: "2",
            label: "Dra. Maria Oliveira",
        },
        {
            value: "3",
            label: "Dr. Pedro Santos",
        }
    ];

    const tipo: Opcao[] = [
        {
            value: "1",
            label: "Presencial",
        },
        {
            value: "2",
            label: "Online",
        }
    ];

    const status: Opcao[] = [
        {
            value: "1",
            label: "Agendada",
        },
        {
            value: "2",
            label: "Realizada",
        },
        {
            value: "3",
            label: "Cancelada",
        }
    ];
    const formScheme:Consulta = {
        id:"",
        idMedico:"",
        idPaciente:"",
        dataHora:"",
        motivoConsulta:"",
        tipoConsulta:"",
        status:"",
        observações:"",
        prescricaoMedica:""
    }
    const formik = useFormik({
        initialValues:{...formScheme},
        onSubmit,
        validationSchema:validationScheme
    });
    return(
        <form onSubmit={formik.handleSubmit}>
            <div className="row">
                <Select id="medico" name="medico" label="Selecione o médico:" opcoes={medicos} className="col"/>
                <Select id="paciente" name="paciente" label="Selecione o paciente:" opcoes={pacientes} className="col"/>
                <Input id="data" type="time" onChange={formik.handleChange} TextLabel="Escolha a data" error={formik.errors.dataHora} className="col"/>
                <Input id="motivo" type="text" onChange={formik.handleChange} TextLabel="Motivo da consulta:" error={formik.errors.motivoConsulta} className="col"/>
                <Select id="tipoConsulta" name="tipoConsulta" label="Tipo da consulta:" opcoes={tipo} className="col"/>
                <Select id="status" name="status" label="Status:" opcoes={status} className="col"/>
                <Input id="observacoes" type="text" onChange={formik.handleChange} TextLabel="Observações:" error={formik.errors.observações} className="col"/>
                <Input id="prescricaoMedica" type="text" onChange={formik.handleChange} TextLabel="Prescrição médica:" error={formik.errors.prescricaoMedica} className="col"/>
                <button type="submit">Cadastrar consulta</button>
            </div>
        </form>
    )
}