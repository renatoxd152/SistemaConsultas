package medico.consultas.backend.model;


import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "consultas")
public class Consultas {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "data")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date data;
	@Column(name="hora")
	private String hora;
	@Column(name = "motivo",length = 300)
	private String motivo;
	@Column(name = "tipo")
	private String tipo;
	@Column(name = "status")
	private String status;
	@Column(name = "observacoes",length = 500)
	private String observacoes;
	@Column(name = "prescricaoMedica",length = 1000)
	private String prescricaoMedica;
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="paciente_id")
	private Paciente paciente;
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="medico_id")
	private Medico medico;

	public Consultas(Long id, Date data, String hora, String motivo, String tipo, String status, String observacoes,
			String prescricaoMedica, Paciente paciente, Medico medico) {
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


	public Consultas(Date data, String hora, String motivo, String tipo, String status, String observacoes,
			String prescricaoMedica, Paciente paciente, Medico medico) {
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




	public Consultas() {
		super();
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
