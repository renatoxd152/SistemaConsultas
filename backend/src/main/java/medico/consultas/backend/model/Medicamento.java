package medico.consultas.backend.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="medicamentos")
public class Medicamento {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "medicamento",length = 100)
	private String medicamento;
	
	@ManyToMany(mappedBy = "medicamentosProibidos")
	private List<Paciente> pacientes;
	
	
	public Medicamento(Long id, String medicamento, List<Paciente> pacientes) {
		super();
		this.id = id;
		this.medicamento = medicamento;
		this.pacientes = pacientes;
	}

	public Medicamento(Long id, String medicamento) {
		super();
		this.id = id;
		this.medicamento = medicamento;
	}


	public Medicamento(String medicamento) {
		super();
		this.medicamento = medicamento;
	}

	public Medicamento() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMedicamento() {
		return medicamento;
	}

	public void setMedicamento(String medicamento) {
		this.medicamento = medicamento;
	}

	public List<Paciente> getPacientes() {
		return pacientes;
	}

	public void setPacientes(List<Paciente> pacientes) {
		this.pacientes = pacientes;
	}
	
	
	
	
	
	
}
