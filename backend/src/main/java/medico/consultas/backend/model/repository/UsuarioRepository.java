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
	 
	 @Query(value="select u.id,u.login,ro.role from users_roles r join usuarios u on r.user_id = u.id join roles ro ON ro.id = r.role_id\r\n"
	 		+ "",nativeQuery = true)
	 Page<UsersRoles> findAllUsersRoles(Pageable pageable);
	 
	 @Query(value="delete from users_roles where user_id = :id",nativeQuery = true)
	 Optional<UsersRoles> deleteByUserID(Long id);
}
