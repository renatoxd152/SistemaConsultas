package medico.consultas.backend.model.rest.medicamentos;

import java.util.List;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import medico.consultas.backend.model.Medicamento;
import medico.consultas.backend.model.repository.MedicamentoRepository;

@RestController
@RequestMapping("/api/medicamentos")
@CrossOrigin("*")
public class MedicamentosController {
	@Autowired
	private MedicamentoRepository medicamentoRepository;
	
	@PostMapping
	public ResponseEntity salvar(@RequestBody MedicamentosFormRequest request)
	{
		Medicamento medicamento = request.toModel();
		medicamentoRepository.save(medicamento);
		return ResponseEntity.ok(MedicamentosFormRequest.fromModel(medicamento));
	}
	
	@GetMapping("{id}")
	public ResponseEntity<MedicamentosFormRequest> getById(@PathVariable Long id)
	{
		return medicamentoRepository.findById(id).map(MedicamentosFormRequest::fromModel).map(medicamentoFR->ResponseEntity.ok(medicamentoFR)).orElseGet(()->ResponseEntity.notFound().build());
	}
	
	@GetMapping
	public List<MedicamentosFormRequest> findAll()
	{
		return medicamentoRepository.findAll().stream().map(MedicamentosFormRequest::fromModel).collect(Collectors.toList());
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Object> delete(@PathVariable Long id)
	{
		return medicamentoRepository.findById(id).map(medicamento->
		{
			medicamentoRepository.delete(medicamento);
			return ResponseEntity.noContent().build();
		}).orElseGet(()->ResponseEntity.notFound().build());
	}
	
	@GetMapping("/listar/paginas")
	public Page<MedicamentosFormRequest> getLista(Pageable pageable)
	{
		return medicamentoRepository.findAll(pageable).map(MedicamentosFormRequest::fromModel);
	}
}
