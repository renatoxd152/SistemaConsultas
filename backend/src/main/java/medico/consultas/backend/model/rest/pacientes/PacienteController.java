package medico.consultas.backend.model.rest.pacientes;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import medico.consultas.backend.model.Paciente;
import medico.consultas.backend.model.repository.PacienteRepository;
import medico.consultas.backend.model.rest.medicamentos.MedicamentosFormRequest;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin("*")
public class PacienteController {
	
	@Autowired
	private PacienteRepository pacienteRepository;
	
	@PostMapping
	public ResponseEntity salvar(@RequestBody PacienteFormRequest request)
	{
		Paciente paciente = request.toModel();
		pacienteRepository.save(paciente);
		return ResponseEntity.ok(PacienteFormRequest.fromModel(paciente));
	}
	
	@GetMapping("{id}")
	public ResponseEntity<PacienteFormRequest> getById(@PathVariable Long id)
	{
		return pacienteRepository.findById(id).map(PacienteFormRequest::fromModel).map(pacienteFR->ResponseEntity.ok(pacienteFR)).orElseGet(()->ResponseEntity.notFound().build());
	}
	
	
	
	@GetMapping
	public List<PacienteFormRequest> findAll()
	{
		return pacienteRepository.findAll().stream().map(PacienteFormRequest::fromModel).collect(Collectors.toList());
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Object> delete(@PathVariable Long id)
	{
		return pacienteRepository.findById(id).map(paciente->
		{
			pacienteRepository.delete(paciente);
			return ResponseEntity.noContent().build();
		}).orElseGet(()->ResponseEntity.notFound().build());
	}
	
}
