package medico.consultas.backend.model.rest.pacientes;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import medico.consultas.backend.model.Paciente;

public class PacienteFormRequest {
	private Long id; 
	private String nome; 
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate dataNascimento; 
	private String cpf; 
	private String rg;
	
	
	public PacienteFormRequest(Long id, String nome, LocalDate dataNascimento, String cpf, String rg) {
		super();
		this.id = id;
		this.nome = nome;
		this.dataNascimento = dataNascimento;
		this.cpf = cpf;
		this.rg = rg;
	}
	
	
	public PacienteFormRequest(String nome, LocalDate dataNascimento, String cpf, String rg) {
		super();
		this.nome = nome;
		this.dataNascimento = dataNascimento;
		this.cpf = cpf;
		this.rg = rg;
	}
	

	public PacienteFormRequest() {
		super();
	}


	public Paciente toModel()
	{
		return new Paciente(id, nome, dataNascimento, cpf, rg);
	}
	
	public static PacienteFormRequest fromModel(Paciente paciente)
	{
		return new PacienteFormRequest(paciente.getId(), paciente.getNome(), paciente.getDataNascimento(), paciente.getCpf(),paciente.getRg());
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


	@Override
	public String toString() {
		return "PacienteFormRequest [id=" + id + ", nome=" + nome + ", dataNascimento=" + dataNascimento + ", cpf="
				+ cpf + ", rg=" + rg + "]";
	}
	
	
	
	
}
