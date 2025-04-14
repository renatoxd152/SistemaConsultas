import { useFormik } from "formik";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConsultaCadastroForm } from "../../../app/models/consultaForm";
import { useMedicoService } from "../../../app/services/medicos.service";
import { usePacienteService } from "../../../app/services/pacientes.service";
import { Input } from "../../common/input";
import { Select } from "../../common/select";
import { validationScheme } from "../validationSchema";

interface ConsultasFormProps{
    onSubmit:(consulta:ConsultaCadastroForm)=>void;
}
export const ConsultasForm:React.FC<ConsultasFormProps> = ({
    onSubmit
}) =>
{
    const serviceMedico = useMedicoService()
    const servicePaciente = usePacienteService()
    const [medicosFormatados, setMedicosFormatados] = useState<{ value: string; label: string }[]>([]);
    const [pacientesFormatados, setPacientesFormatados] = useState<{ value: string; label: string }[]>([]);

    const carregarDados = async () => {
        try {
            const medicosData = await serviceMedico.listar();
           
            const pacientesData = await servicePaciente.listar();
            const medicosFormatados = medicosData.map(medico => ({
                value: medico.id ? String(medico.id) : '',
                label: medico.nome ?? ""
            }));
    
           
            const pacientesFormatados = pacientesData.map(paciente => ({
                value: paciente.id ? String(paciente.id) : '',
                label: paciente.nome ? String(paciente.nome) :''
            }));
        
            
    
            setMedicosFormatados(medicosFormatados);
            setPacientesFormatados(pacientesFormatados);

            if (medicosFormatados.length > 0 && pacientesFormatados.length > 0) {
                formik.setValues({
                    ...formik.values,
                    medico_id: Number(medicosFormatados[0].value),
                    paciente_id: Number(pacientesFormatados[0].value),
                });
            }

    
        } catch (error) {
            console.error("Erro ao carregar médicos:", error);
        }

    };
    useEffect(() => {
        carregarDados();
    }, []);

 const tipo = [
        {
            value: "1",
            label: "Presencial",
        },
        {
            value: "2",
            label: "Online",
        }
    ];

    const status = [
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
    const formScheme:ConsultaCadastroForm = {
        id:"",
        medico_id:0,
        paciente_id:0,
        data:"",
        hora:"",
        motivo:"",
        tipo:"1",
        status:"1",
        observacoes:"",
        prescricaoMedica:""
    }
    const formik = useFormik({
        initialValues:{...formScheme},
        onSubmit,
        validationSchema:validationScheme,
        validateOnChange: false
    });
    const navigate = useNavigate()
    return(
        <form onSubmit={formik.handleSubmit} className="order p-4 rounded shadow bg-white">
            <div className="row">
                <Select id="medico" name="medico_id" label="Selecione o médico:" onChange={formik.handleChange} opcoes={medicosFormatados} value={formik.values.medico_id} className="col" selectClassName="form-select" labelClassName="input-group-text"/>
                <Select id="paciente" name="paciente_id" label="Selecione o paciente:" onChange={formik.handleChange} opcoes={pacientesFormatados} value={formik.values.paciente_id} className="col" selectClassName="form-select" labelClassName="input-group-text"/>
                <Input id="dia" type="date" name="data" onChange={formik.handleChange} value={formik.values.data} TextLabel="Escolha a data" errorClassName="text-danger small mt-1" error={formik.errors.data} className="col" inputClassName="form-control"/>
                <Input id="data" type="time" name="hora" onChange={formik.handleChange} value={formik.values.hora} TextLabel="Escolha o horário" errorClassName="text-danger small mt-1" error={formik.errors.hora} className="col" inputClassName="form-control"/>
            </div>
            <div className="row">
                <Input id="motivo" name="motivo" type="text" onChange={formik.handleChange} value={formik.values.motivo} TextLabel="Motivo da consulta:" errorClassName="text-danger small mt-1" error={formik.errors.motivo} className="col p-3" inputClassName="form-control"  />
                <Select id="tipoConsulta" onChange={formik.handleChange} value={formik.values.tipo} name="tipo" label="Tipo da consulta:" opcoes={tipo} className="input-group mb-3 mt-4" selectClassName="form-select" labelClassName="input-group-text"/>
                <Select id="status" name="status" label="Status:" opcoes={status} onChange={formik.handleChange} className="input-group mb-3 mt-4" selectClassName="form-select" labelClassName="input-group-text"/>
            </div>
            <div className="row">

                <Input id="observacoes" name="observacoes" type="text" onChange={formik.handleChange}  TextLabel="Observações:" errorClassName="text-danger small mt-1" error={formik.errors.observacoes} className="col p-3" inputClassName="form-control" value={formik.values.observacoes}/>
                <Input id="prescricaoMedica" name="prescricaoMedica" type="text" onChange={formik.handleChange} TextLabel="Prescrição médica:" errorClassName="text-danger small mt-1" error={formik.errors.prescricaoMedica} className="col p-3" inputClassName="form-control" value={formik.values.prescricaoMedica} />
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button type="submit" className="btn btn-primary p-2">
                    Cadastrar consulta
                </button>
            </div>
            <div className="d-flex justify-content-start mt-4">
                <Button
                    type="button"
                    label="Voltar para a listagem" 
                    className="btn btn-secondary" 
                    icon="pi pi-arrow-left" 
                    onClick={() => navigate("/consultas/listar")} 
                />
            </div>
        </form>
    )
}