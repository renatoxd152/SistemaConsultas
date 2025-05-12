package medico.consultas.backend.model.rest.consultas;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import medico.consultas.backend.util.DateUtils;
import medico.consultas.backend.model.Consultas;
import medico.consultas.backend.model.repository.ConsultasRepository;
import medico.consultas.backend.model.rest.medicos.MedicoFormRequest;
import medico.consultas.backend.service.RelatorioConsultasService;

@RestController
@RequestMapping("/api/consultas")
@CrossOrigin("*")
public class ConsultasController {
	@Autowired
	private ConsultasRepository consultasRepository;
	@Autowired
	private RelatorioConsultasService relatorioConsultasService;
	@PostMapping
	public ResponseEntity salvar(@RequestBody ConsultasFormRequest request)
	{
		Consultas consulta = request.toModel();
		consultasRepository.save(consulta);
		return ResponseEntity.ok(ConsultasFormRequest.fromModel(consulta));
	}
	
	@GetMapping("{id}")
	public ResponseEntity getById(@PathVariable Long id)
	{
		return consultasRepository.findById(id).map(ConsultasFormRequest::fromModel).map(consultaFR->ResponseEntity.ok(consultaFR)).orElseGet(()->ResponseEntity.notFound().build());
	}
	
	@GetMapping
	public List<ConsultasFormRequest> findAll()
	{
		return consultasRepository.findAll().stream().map(ConsultasFormRequest::fromModel).collect(Collectors.toList());
	}
	/*
	@GetMapping("/listar/paginas")
	public Page<ConsultasFormRequest> getLista(Pageable pageable)
	{
		return consultasRepository.findAll(pageable).map(ConsultasFormRequest::fromModel);
	}
	*/
	
	@GetMapping("/listar/paginas")
	public Page<ConsultasFormRequest> getLista(Pageable pageable,
			 @RequestParam(value = "busca", required = false, defaultValue = "") String busca)
	{
		return consultasRepository.buscarPorNome(busca, pageable).map(ConsultasFormRequest::fromModel);
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
	
	@GetMapping("/relatorio-consultas")
	public ResponseEntity<byte[]> relatorioConsultas(
	        @RequestParam(value = "inicio", required = false, defaultValue = "") String inicio,
	        @RequestParam(value = "fim", required = false, defaultValue = "") String fim) {

	    System.out.println("Requisição recebida para geração do relatório.");
	    System.out.println("Parâmetro 'inicio': " + inicio);
	    System.out.println("Parâmetro 'fim': " + fim);

	    Date dataInicio = DateUtils.fromString(inicio);
	    Date dataFim = DateUtils.fromString(fim, true);

	    if (dataInicio == null) {
	        dataInicio = DateUtils.fromString("01/01/1970");
	        System.out.println("Data de início não informada. Usando valor padrão: " + dataInicio);
	    }

	    if (dataFim == null) {
	        dataFim = DateUtils.hoje(true);
	        System.out.println("Data de fim não informada. Usando valor atual: " + dataFim);
	    }

	    byte[] relatorioGerado = relatorioConsultasService.gerarRelatorio(dataInicio, dataFim);

	    if (relatorioGerado == null || relatorioGerado.length == 0) {
	        System.out.println("Relatório não foi gerado ou está vazio.");
	    } else {
	        System.out.println("Relatório gerado com sucesso. Tamanho em bytes: " + relatorioGerado.length);
	    }

	    HttpHeaders headers = new HttpHeaders();
	    String fileName = "relatorio-consultas.pdf";

	    headers.setContentDispositionFormData("inline;filename=\"" + fileName + "\"", fileName);
	    headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

	    return new ResponseEntity<>(relatorioGerado, headers, HttpStatus.OK);
	}

	
}
