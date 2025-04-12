package medico.consultas.backend.model.repository;


import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import medico.consultas.backend.model.Usuario;
import medico.consultas.backend.model.repository.projections.UsersRoles;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	 Optional<Usuario> findByLogin(String login);
	 
	 @Query(value="SELECT \r\n"
	 		+ "  u.id,\r\n"
	 		+ "  u.login,\r\n"
	 		+ "  CASE \r\n"
	 		+ "    WHEN ro.role = 'ROLE_ADMINISTRATOR' THEN 'Administrador'\r\n"
	 		+ "    WHEN ro.role = 'ROLE_CUSTOMER' THEN 'Comum'\r\n"
	 		+ "    ELSE ro.role \r\n"
	 		+ "  END AS role\r\n"
	 		+ "FROM users_roles r\r\n"
	 		+ "JOIN usuarios u ON r.user_id = u.id\r\n"
	 		+ "JOIN roles ro ON ro.id = r.role_id",nativeQuery = true)
	 Page<UsersRoles> findAllUsersRoles(Pageable pageable);
	 
	 @Query(value="delete from users_roles where user_id = :id",nativeQuery = true)
	 Optional<UsersRoles> deleteByUserID(Long id);
	 
	 @Query(value="SELECT u.id, u.login"
	 		+ ", ro.role FROM users_roles r "
	 		+ "JOIN usuarios u ON r.user_id = u.id "
	 		+ "JOIN roles ro ON ro.id = r.role_id "
	 		+ "WHERE u.id = :id", nativeQuery = true)
	 Optional<UsersRoles> findByID(Long id);
}
