package medico.consultas.backend.model.rest.consultas;


import java.sql.Date;

import medico.consultas.backend.model.Consultas;
import medico.consultas.backend.model.Medico;
import medico.consultas.backend.model.Paciente;


public class ConsultasFormRequest {
	private Long id; 
	private Date data; 
	private String hora;
	private String motivo;
	private String tipo;
	private String status; 
	private String observacoes;
	private String prescricaoMedica; 
	private Paciente paciente; 
	private Medico medico;


	public ConsultasFormRequest(Long id, Date data, String hora, String motivo, String tipo, String status,
			String observacoes, String prescricaoMedica, Paciente  paciente,Medico medico) {
		super();
		this.id = id;
		this.data = data;
		this.hora = hora;
		this.motivo = motivo;
		this.tipo = tipo;
		this.status = status;
		this.observacoes = observacoes;
		this.prescricaoMedica = prescricaoMedica;
		this.paciente = paciente;
		this.medico = medico;
	}

	public ConsultasFormRequest(Date data, String hora, String motivo, String tipo, String status, String observacoes,
			String prescricaoMedica, Paciente paciente,Medico medico) {
		super();
		this.data = data;
		this.hora = hora;
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
		return new Consultas(data,hora, motivo, tipo, status, observacoes, prescricaoMedica, paciente, medico);
	}
	
	public static ConsultasFormRequest fromModel(Consultas consulta)
	{
		return new ConsultasFormRequest(consulta.getId(), 
				consulta.getData(),
				consulta.getHora() ,
				consulta.getMotivo(), 
				consulta.getTipo(), 
				consulta.getStatus(), 
				consulta.getObservacoes(),
				consulta.getPrescricaoMedica(),
				consulta.getPaciente(),
				consulta.getMedico());
	}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public Date getData() {
		return data;
	}



	public void setData(Date data) {
		this.data = data;
	}



	public String getHora() {
		return hora;
	}



	public void setHora(String hora) {
		this.hora = hora;
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
