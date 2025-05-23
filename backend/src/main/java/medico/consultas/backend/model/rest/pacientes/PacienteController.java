package medico.consultas.backend.model.rest.pacientes;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import medico.consultas.backend.model.Medico;
import medico.consultas.backend.model.Paciente;
import medico.consultas.backend.model.repository.PacienteRepository;
import medico.consultas.backend.model.rest.consultas.ConsultasFormRequest;
import medico.consultas.backend.model.rest.medicamentos.MedicamentosFormRequest;
import medico.consultas.backend.model.rest.medicos.MedicoFormRequest;

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
	@GetMapping("/listar/paginas")
	public Page<PacienteFormRequest> getLista(Pageable pageable)
	{
		return pacienteRepository.findAll(pageable).map(PacienteFormRequest::fromModel);
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
	
	@PutMapping("{id}")
	public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody PacienteFormRequest request)
	{
		Optional<Paciente> pacienteExistente = pacienteRepository.findById(id);
		if(pacienteExistente.isEmpty())
		{
			return ResponseEntity.notFound().build();
		}
		Paciente paciente = request.toModel();
		paciente.setId(id);
		pacienteRepository.save(paciente);
		return ResponseEntity.noContent().build();
	}
	
}
