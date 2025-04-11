package medico.consultas.backend.model.rest.dashboards;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import medico.consultas.backend.model.repository.ConsultasRepository;
import medico.consultas.backend.model.repository.MedicamentoRepository;
import medico.consultas.backend.model.repository.MedicoRepository;
import medico.consultas.backend.model.repository.PacienteRepository;
import medico.consultas.backend.model.repository.projections.StatusCount;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
	@Autowired
	private MedicoRepository medicoRepository;
	@Autowired
	private PacienteRepository pacienteRepository;
	@Autowired
	private ConsultasRepository consultasRepository;
	@Autowired
	private MedicamentoRepository medicamentoRepository;
	
	
	@GetMapping
	public DashboardData getDashBoard() {
		long medicosCount = medicoRepository.count();
		long pacientesCount = pacienteRepository.count();
		long consultasCount = consultasRepository.count();
		long medicamentosCount = medicamentoRepository.count();
		List<StatusCount> consultas_status = consultasRepository.countConsultasByStatus();
	
		return new DashboardData(pacientesCount, medicamentosCount, consultasCount, medicamentosCount, consultas_status);
	}
}
