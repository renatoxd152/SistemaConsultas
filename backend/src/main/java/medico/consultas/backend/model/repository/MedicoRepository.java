package medico.consultas.backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import medico.consultas.backend.model.Medico;
public interface MedicoRepository extends JpaRepository<Medico, Long>{
}
