package medico.consultas.backend.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import medico.consultas.backend.model.Consultas;
import medico.consultas.backend.model.repository.projections.StatusCount;

public interface ConsultasRepository extends JpaRepository<Consultas, Long> {
	
	@Query(value=" select status, count(*) as total from consultas group by status",nativeQuery = true)
	List<StatusCount> countConsultasByStatus();
	

}
