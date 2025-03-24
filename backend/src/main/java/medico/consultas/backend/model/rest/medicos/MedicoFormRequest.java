package medico.consultas.backend.model.rest.medicos;
import java.util.List;


import medico.consultas.backend.model.Consultas;
import medico.consultas.backend.model.Medico;

public class MedicoFormRequest {
	private Long id;
	private String nome;
	private String dataNascimento;
	private String genero;
	private String cpf;
	private String rg;
	private String telefone;
	private String email;
	private String numeroCRM;
	private String estadoCRM;
	private String especialidade;
	private String subespecialidade;
	private int anoConclusao;
    private List<Consultas> consultas;
    
    
	public MedicoFormRequest(Long id, String nome, String dataNascimento, String genero, String cpf, String rg,
			String telefone, String email, String numeroCRM, String estadoCRM, String especialidade,
			String subespecialidade, int anoConclusao, List<Consultas> consultas) {
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
	
	
	
	
	
	public MedicoFormRequest(String nome, String dataNascimento, String genero, String cpf, String rg, String telefone,
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





	public MedicoFormRequest(Long id, String nome, String dataNascimento, String genero, String cpf, String rg,
			String telefone, String email, String numeroCRM, String estadoCRM, String especialidade,
			String subespecialidade, int anoConclusao) {
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

	public MedicoFormRequest() {
		super();
	}

	public static MedicoFormRequest fromModel(Medico medico)
	{
		return new MedicoFormRequest(medico.getId(),medico.getNome(),medico.getDataNascimento(),medico.getGenero(),medico.getCpf(),medico.getRg(),
				medico.getTelefone(),medico.getEmail(),medico.getNumeroCRM(),medico.getEstadoCRM(),medico.getEspecialidade(),
				medico.getSubespecialidade(),medico.getAnoConclusao());
	}
	
	public Medico toModel()
	{
		return new Medico(nome,dataNascimento,genero,rg,cpf,telefone,email,numeroCRM,estadoCRM,especialidade,subespecialidade,anoConclusao);
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



	@Override
	public String toString() {
		return "MedicoFormRequest [id=" + id + ", nome=" + nome + ", dataNascimento=" + dataNascimento + ", genero="
				+ genero + ", cpf=" + cpf + ", rg=" + rg + ", telefone=" + telefone + ", email=" + email
				+ ", numeroCRM=" + numeroCRM + ", estadoCRM=" + estadoCRM + ", especialidade=" + especialidade
				+ ", subespecialidade=" + subespecialidade + ", anoConclusao=" + anoConclusao + ", consultas="
				+ consultas + "]";
	}
	
    
    
	
}
