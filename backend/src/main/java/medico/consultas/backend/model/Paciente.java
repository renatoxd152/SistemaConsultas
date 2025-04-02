package medico.consultas.backend.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="pacientes")
public class Paciente {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@Column(name="nome",length = 100)
	private String nome;
	@Column(name="dataNascimento")
	private LocalDate dataNascimento;
	@Column(name="cpf",length = 30)
	private String cpf;
	@Column(name="rg",length = 30)
	private String rg;
	
	@ManyToMany
	@JoinTable(
		name = "pacientes_medicamentos_proibidos",
		joinColumns = @JoinColumn(referencedColumnName = "id"),
		inverseJoinColumns = @JoinColumn(name="medicamento_id")
			)
	private List<Medicamento> medicamentosProibidos;

	@ManyToMany
    @JoinTable(
        name = "pacientes_medicos",
        joinColumns = @JoinColumn(name = "id"),
        inverseJoinColumns = @JoinColumn(name = "medico_id")
    )
    private List<Medico> medicos;
	
	@JsonIgnore
    @OneToMany(mappedBy = "paciente")
    private List<Consultas> consultas;

  
	public Paciente(Long id, String nome, LocalDate dataNascimento, String cpf, String rg,
			List<Medicamento> medicamentosProibidos, List<Medico> medicos, List<Consultas> consultas) {
		super();
		this.id = id;
		this.nome = nome;
		this.dataNascimento = dataNascimento;
		this.cpf = cpf;
		this.rg = rg;
		this.medicamentosProibidos = medicamentosProibidos;
		this.medicos = medicos;
		this.consultas = consultas;
	}
	
	

	public Paciente(String nome, LocalDate dataNascimento, String cpf, String rg, List<Medicamento> medicamentosProibidos,
			List<Medico> medicos, List<Consultas> consultas) {
		super();
		this.nome = nome;
		this.dataNascimento = dataNascimento;
		this.cpf = cpf;
		this.rg = rg;
		this.medicamentosProibidos = medicamentosProibidos;
		this.medicos = medicos;
		this.consultas = consultas;
	}


	
	
	public Paciente(Long id, String nome, LocalDate dataNascimento, String cpf, String rg) {
		super();
		this.id = id;
		this.nome = nome;
		this.dataNascimento = dataNascimento;
		this.cpf = cpf;
		this.rg = rg;
	}



	public Paciente(String nome, LocalDate dataNascimento, String cpf, String rg) {
		super();
		this.nome = nome;
		this.dataNascimento = dataNascimento;
		this.cpf = cpf;
		this.rg = rg;
	}



	public Paciente() {
		super();
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public List<Medicamento> getMedicamentosProibidos() {
		return medicamentosProibidos;
	}

	public void setMedicamentosProibidos(List<Medicamento> medicamentosProibidos) {
		this.medicamentosProibidos = medicamentosProibidos;
	}



	public List<Medico> getMedicos() {
		return medicos;
	}



	public void setMedicos(List<Medico> medicos) {
		this.medicos = medicos;
	}



	public List<Consultas> getConsultas() {
		return consultas;
	}



	public void setConsultas(List<Consultas> consultas) {
		this.consultas = consultas;
	}
	
	
	
	
}
