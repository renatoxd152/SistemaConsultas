package medico.consultas.backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import medico.consultas.backend.model.Medicamento;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long>{

}
