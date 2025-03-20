package medico.consultas.backend.model.rest.consultas;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import medico.consultas.backend.model.Consultas;
import medico.consultas.backend.model.Medico;
import medico.consultas.backend.model.Paciente;

public class ConsultasFormRequest {
	private Long id; 
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate dataHora; 
	private String motivo;
	private String tipo;
	private String status; 
	private String observacoes;
	private String prescricaoMedica; 
	private Paciente paciente; 
	private Medico medico;
	
	
	public ConsultasFormRequest(Long id, LocalDate dataHora, String motivo, String tipo, String status,
			String observacoes, String prescricaoMedica, Paciente paciente, Medico medico) {
		super();
		this.id = id;
		this.dataHora = dataHora;
		this.motivo = motivo;
		this.tipo = tipo;
		this.status = status;
		this.observacoes = observacoes;
		this.prescricaoMedica = prescricaoMedica;
		this.paciente = paciente;
		this.medico = medico;
	}


	public ConsultasFormRequest(LocalDate dataHora, String motivo, String tipo, String status, String observacoes,
			String prescricaoMedica, Paciente paciente, Medico medico) {
		super();
		this.dataHora = dataHora;
		this.motivo = motivo;
		this.tipo = tipo;
		this.status = status;
		this.observacoes = observacoes;
		this.prescricaoMedica = prescricaoMedica;
		this.paciente = paciente;
		this.medico = medico;
	}


	public ConsultasFormRequest() {
		super();
	}

	public Consultas toModel()
	{
		return new Consultas(id, dataHora, motivo, tipo, status, observacoes, prescricaoMedica, paciente, medico);
	}
	
	public static ConsultasFormRequest fromModel(Consultas consulta)
	{
		return new ConsultasFormRequest(consulta.getId(), consulta.getDataHora(), consulta.getMotivo(), consulta.getTipo(), consulta.getStatus(), 
				consulta.getObservacoes(),consulta.getPrescricaoMedica(),consulta.getPaciente(),consulta.getMedico());
	}
	
	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public LocalDate getDataHora() {
		return dataHora;
	}


	public void setDataHora(LocalDate dataHora) {
		this.dataHora = dataHora;
	}


	public String getMotivo() {
		return motivo;
	}


	public void setMotivo(String motivo) {
		this.motivo = motivo;
	}


	public String getTipo() {
		return tipo;
	}


	public void setTipo(String tipo) {
		this.tipo = tipo;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getObservacoes() {
		return observacoes;
	}


	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}


	public String getPrescricaoMedica() {
		return prescricaoMedica;
	}


	public void setPrescricaoMedica(String prescricaoMedica) {
		this.prescricaoMedica = prescricaoMedica;
	}


	public Paciente getPaciente() {
		return paciente;
	}


	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}


	public Medico getMedico() {
		return medico;
	}


	public void setMedico(Medico medico) {
		this.medico = medico;
	}
	
	
	
	
}
