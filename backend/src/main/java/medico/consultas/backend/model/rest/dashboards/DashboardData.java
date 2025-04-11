package medico.consultas.backend.model.rest.dashboards;

import java.util.List;

import medico.consultas.backend.model.repository.projections.StatusCount;

public class DashboardData {
	
	private Long pacientes;
	private Long medicos;
	private Long consultas;
	private Long medicamentos;
	private List<StatusCount> consultas_status;
	
	public DashboardData(Long pacientes, Long medicos, Long consultas, Long medicamentos,
			List<StatusCount> consultas_status) {
		super();
		this.pacientes = pacientes;
		this.medicos = medicos;
		this.consultas = consultas;
		this.medicamentos = medicamentos;
		this.consultas_status = consultas_status;
	}
	public List<StatusCount> getConsultas_status() {
		return consultas_status;
	}
	public void setConsultas_status(List<StatusCount> consultas_status) {
		this.consultas_status = consultas_status;
	}
	public Long getPacientes() {
		return pacientes;
	}
	public void setPacientes(Long pacientes) {
		this.pacientes = pacientes;
	}
	public Long getMedicos() {
		return medicos;
	}
	public void setMedicos(Long medicos) {
		this.medicos = medicos;
	}
	public Long getConsultas() {
		return consultas;
	}
	public void setConsultas(Long consultas) {
		this.consultas = consultas;
	}
	public Long getMedicamentos() {
		return medicamentos;
	}
	public void setMedicamentos(Long medicamentos) {
		this.medicamentos = medicamentos;
	}
	
}
