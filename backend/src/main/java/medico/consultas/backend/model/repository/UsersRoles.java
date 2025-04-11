package medico.consultas.backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import medico.consultas.backend.model.Usuario;

public interface UsersRoles extends JpaRepository<Usuario, Long> {

}
