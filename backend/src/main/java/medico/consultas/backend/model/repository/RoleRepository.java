package medico.consultas.backend.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import medico.consultas.backend.enums.RoleName;
import medico.consultas.backend.model.Role;
import medico.consultas.backend.model.Usuario;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByRole(RoleName role);
}
