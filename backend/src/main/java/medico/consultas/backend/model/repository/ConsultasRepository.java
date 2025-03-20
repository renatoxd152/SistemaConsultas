package medico.consultas.backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import medico.consultas.backend.model.Consultas;

public interface ConsultasRepository extends JpaRepository<Consultas, Long> {

}
