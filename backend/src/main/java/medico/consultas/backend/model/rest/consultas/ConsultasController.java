package medico.consultas.backend.model.rest.consultas;

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

import medico.consultas.backend.model.Consultas;
import medico.consultas.backend.model.repository.ConsultasRepository;
import medico.consultas.backend.model.rest.medicamentos.MedicamentosFormRequest;

@RestController
@RequestMapping("/api/consultas")
@CrossOrigin("*")
public class ConsultasController {
	@Autowired
	private ConsultasRepository consultasRepository;
	
	@PostMapping
	public ResponseEntity salvar(@PathVariable Long id,@RequestBody ConsultasFormRequest request)
	{
		Consultas consulta = request.toModel();
		consultasRepository.save(consulta);
		return ResponseEntity.ok(ConsultasFormRequest.fromModel(consulta));
	}
	
	@GetMapping
	public ResponseEntity getById(@PathVariable Long id)
	{
		return consultasRepository.findById(id).map(ConsultasFormRequest::fromModel).map(consultaFR->ResponseEntity.ok(consultaFR)).orElseGet(()->ResponseEntity.notFound().build());
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Object> delete(@PathVariable Long id)
	{
		return consultasRepository.findById(id).map(consulta->
		{
			consultasRepository.delete(consulta);
			return ResponseEntity.noContent().build();
		}).orElseGet(()->ResponseEntity.notFound().build());
	}
}
