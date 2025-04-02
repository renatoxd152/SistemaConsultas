package medico.consultas.backend.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="medicos")
public class Medico {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="nome",length = 100)
	private String nome;
	@Column(name="dataNascimento")
	private String dataNascimento;
	@Column(name="genero",length = 10)
	private String genero;
	@Column(name="cpf",length = 14)
	private String cpf;
	@Column(name="rg")
	private String rg;
	@Column(name="telefone",length = 14)
	private String telefone;
	@Column(name="email",length = 100)
	private String email;
	@Column(name="numeroCRM",length = 50)
	private String numeroCRM;
	@Column(name="estadoCRM",length = 2)
	private String estadoCRM;
	@Column(name="especialidade",length = 30)
	private String especialidade;
	@Column(name="subespecialidade",length = 30)
	private String subespecialidade;
	@Column(name="anoConclusao",precision = 4)
	private int anoConclusao;
	
	@JsonIgnore
    @OneToMany(mappedBy = "medico")
    private List<Consultas> consultas;
	
	
	
	public Medico(Long id, String nome, String dataNascimento, String genero, String cpf, String rg, String telefone,
			String email, String numeroCRM, String estadoCRM, String especialidade, String subespecialidade,
			int anoConclusao, List<Consultas> consultas) {
		super();
		this.id = id;
		this.nome = nome;
		this.dataNascimento = dataNascimento;
		this.genero = genero;
		this.cpf = cpf;
		this.rg = rg;
		this.telefone = telefone;
		this.email = email;
		this.numeroCRM = numeroCRM;
		this.estadoCRM = estadoCRM;
		this.especialidade = especialidade;
		this.subespecialidade = subespecialidade;
		this.anoConclusao = anoConclusao;
		this.consultas = consultas;
	}
	
	
	public Medico(String nome, String dataNascimento, String genero, String cpf, String rg, String telefone,
			String email, String numeroCRM, String estadoCRM, String especialidade, String subespecialidade,
			int anoConclusao, List<Consultas> consultas) {
		super();
		this.nome = nome;
		this.dataNascimento = dataNascimento;
		this.genero = genero;
		this.cpf = cpf;
		this.rg = rg;
		this.telefone = telefone;
		this.email = email;
		this.numeroCRM = numeroCRM;
		this.estadoCRM = estadoCRM;
		this.especialidade = especialidade;
		this.subespecialidade = subespecialidade;
		this.anoConclusao = anoConclusao;
		this.consultas = consultas;
	}


	


	public Medico(String nome, String dataNascimento, String genero, String cpf, String rg, String telefone,
			String email, String numeroCRM, String estadoCRM, String especialidade, String subespecialidade,
			int anoConclusao) {
		super();
		this.nome = nome;
		this.dataNascimento = dataNascimento;
		this.genero = genero;
		this.cpf = cpf;
		this.rg = rg;
		this.telefone = telefone;
		this.email = email;
		this.numeroCRM = numeroCRM;
		this.estadoCRM = estadoCRM;
		this.especialidade = especialidade;
		this.subespecialidade = subespecialidade;
		this.anoConclusao = anoConclusao;
	}

	
	

	public Medico(Long id, String nome, String dataNascimento, String genero, String cpf, String rg, String telefone,
			String email, String numeroCRM, String estadoCRM, String especialidade, String subespecialidade,
			int anoConclusao) {
		super();
		this.id = id;
		this.nome = nome;
		this.dataNascimento = dataNascimento;
		this.genero = genero;
		this.cpf = cpf;
		this.rg = rg;
		this.telefone = telefone;
		this.email = email;
		this.numeroCRM = numeroCRM;
		this.estadoCRM = estadoCRM;
		this.especialidade = especialidade;
		this.subespecialidade = subespecialidade;
		this.anoConclusao = anoConclusao;
	}


	public Medico() {
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

	public String getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(String dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getGenero() {
		return genero;
	}

	public void setGenero(String genero) {
		this.genero = genero;
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

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNumeroCRM() {
		return numeroCRM;
	}

	public void setNumeroCRM(String numeroCRM) {
		this.numeroCRM = numeroCRM;
	}

	public String getEstadoCRM() {
		return estadoCRM;
	}

	public void setEstadoCRM(String estadoCRM) {
		this.estadoCRM = estadoCRM;
	}

	public String getEspecialidade() {
		return especialidade;
	}

	public void setEspecialidade(String especialidade) {
		this.especialidade = especialidade;
	}

	public String getSubespecialidade() {
		return subespecialidade;
	}

	public void setSubespecialidade(String subespecialidade) {
		this.subespecialidade = subespecialidade;
	}

	public int getAnoConclusao() {
		return anoConclusao;
	}

	public void setAnoConclusao(int anoConclusao) {
		this.anoConclusao = anoConclusao;
	}


	public List<Consultas> getConsultas() {
		return consultas;
	}


	public void setConsultas(List<Consultas> consultas) {
		this.consultas = consultas;
	}
	
	
	


	
	
	
	
	
	
	
	
	
}
