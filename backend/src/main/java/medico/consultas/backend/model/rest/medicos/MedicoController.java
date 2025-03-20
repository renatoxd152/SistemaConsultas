package medico.consultas.backend.model.rest.medicos;

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
import medico.consultas.backend.model.Medico;
import medico.consultas.backend.model.repository.MedicoRepository;

@RestController
@RequestMapping("/api/medicos")
@CrossOrigin("*")
public class MedicoController {
	
	@Autowired
	private MedicoRepository medicoRepository;
	
	@PostMapping
	public ResponseEntity salvar(@RequestBody MedicoFormRequest request)
	{
		Medico medico = request.toModel();
		medicoRepository.save(medico);
		return ResponseEntity.ok(MedicoFormRequest.fromModel(medico));
	}
	
	@GetMapping("{id}")
	public ResponseEntity<MedicoFormRequest> getById(@PathVariable Long id)
	{
		return medicoRepository.findById(id).map(MedicoFormRequest::fromModel).map(medicoFR->ResponseEntity.ok(medicoFR)).orElseGet(()->ResponseEntity.notFound().build());
	}
	
	@DeleteMapping("{id}")
	
	public ResponseEntity<Object> delete(@PathVariable Long id)
	{
		return medicoRepository.findById(id).map(medico->
		{
			medicoRepository.delete(medico);
			return ResponseEntity.noContent().build();
		}).orElseGet(()->ResponseEntity.notFound().build());
	}

}
