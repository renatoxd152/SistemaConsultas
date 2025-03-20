package medico.consultas.backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import medico.consultas.backend.model.Paciente;

public interface PacienteRepository extends JpaRepository<Paciente, Long>{

}
