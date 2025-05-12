package medico.consultas.backend.model.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import medico.consultas.backend.model.Consultas;
import medico.consultas.backend.model.repository.projections.StatusCount;

public interface ConsultasRepository extends JpaRepository<Consultas, Long> {
	
	@Query(value=" select status, count(*) as total from consultas group by status",nativeQuery = true)
	List<StatusCount> countConsultasByStatus();
	
	@Query(value = """
		    SELECT c.* 
		    FROM consultas c 
		    JOIN pacientes p ON c.paciente_id = p.id 
		    JOIN medicos m ON c.medico_id = m.id 
			WHERE (:busca = '' OR lower(p.nome) LIKE lower(CONCAT('%', :busca, '%'))
			OR lower(m.nome) LIKE lower(CONCAT('%', :busca, '%')))
		""", nativeQuery = true)
		Page<Consultas> buscarPorNome(
		    @Param("busca") String busca,
		    Pageable pageable);
}
