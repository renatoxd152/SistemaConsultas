package medico.consultas.backend.model.rest.medicamentos;

import medico.consultas.backend.model.Medicamento;

public class MedicamentosFormRequest {
	private Long id;
	private String medicamento;
	
	
	public MedicamentosFormRequest(Long id, String medicamento) {
		super();
		this.id = id;
		this.medicamento = medicamento;
	}


	public MedicamentosFormRequest(String medicamento) {
		super();
		this.medicamento = medicamento;
	}


	public MedicamentosFormRequest() {
		super();
	}

	
	public Medicamento toModel()
	{
		return new Medicamento(medicamento);
	}
	
	public static MedicamentosFormRequest fromModel(Medicamento medicamento)
	{
		return new MedicamentosFormRequest(medicamento.getId(), medicamento.getMedicamento());
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
	
	
	
}
