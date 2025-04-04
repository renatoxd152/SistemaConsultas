package medico.consultas.backend.model.rest.consultas;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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
	public ResponseEntity<byte[]> relatorioConsultas(@RequestParam(value="inicio",required=false,defaultValue="")String inicio,
			@RequestParam(value="fim",required=false,defaultValue="")String fim)
	{
		
		Date dataInicio=DateUtils.fromString(inicio);
		Date dataFim=DateUtils.fromString(fim,true);
		
		if(dataInicio == null)
		{
			dataInicio = DateUtils.fromString("01/01/1970");
		}
		
		if(dataFim == null)
		{
			dataFim = DateUtils.hoje(true);
		}
		
		
		var relatorioGerado = relatorioConsultasService.gerarRelatorio(dataInicio,dataFim);
		HttpHeaders headers = new HttpHeaders();
		var fileName = "relatorio-consultas.pdf";
		
		headers.setContentDispositionFormData("inline;filename=\"" + fileName + "\"",fileName);
		headers.setCacheControl("must-revalidate,post-check=0,pre-cehck=0");
		
		var responseEntity = new ResponseEntity<>(relatorioGerado,headers,HttpStatus.OK);
		
		return responseEntity;
	}
	
}
