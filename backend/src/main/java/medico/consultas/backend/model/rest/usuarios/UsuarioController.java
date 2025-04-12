package medico.consultas.backend.model.rest.usuarios;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import medico.consultas.backend.dto.CreateUserDTO;
import medico.consultas.backend.dto.LoginUserDto;
import medico.consultas.backend.dto.RecoveryJwtTokenDto;
import medico.consultas.backend.model.Medico;
import medico.consultas.backend.model.Usuario;
import medico.consultas.backend.model.repository.UsuarioRepository;
import medico.consultas.backend.model.repository.projections.UsersRoles;
import medico.consultas.backend.model.rest.medicos.MedicoFormRequest;
import medico.consultas.backend.service.UsuarioService;
@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin("*")

public class UsuarioController {
	
	@Autowired
    private UsuarioService userService;
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	 @PostMapping("/login")
	    public ResponseEntity<RecoveryJwtTokenDto> authenticateUser(@RequestBody LoginUserDto loginUserDto) {
	        RecoveryJwtTokenDto token = userService.authenticateUser(loginUserDto);
	        return new ResponseEntity<>(token, HttpStatus.OK);
	    }	

	@PostMapping
	public ResponseEntity<Void> createUser(@RequestBody CreateUserDTO createUserDto) {
	    userService.createUser(createUserDto);
	    return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
	@GetMapping
	 public Page<UsersRoles> findAllUsersRoles(Pageable pageable)
	 {
		return usuarioRepository.findAllUsersRoles(pageable);
	 }
	
	@DeleteMapping("{id}")
	public ResponseEntity<Object> delete(@PathVariable Long id)
	{
		return usuarioRepository.findById(id).map(usuario->
		{
			usuarioRepository.delete(usuario);
			return ResponseEntity.noContent().build();
		}).orElseGet(()->ResponseEntity.notFound().build());
	}
	
	@GetMapping("{id}")
	public Optional<UsersRoles> getById(@PathVariable Long id)
	{
		return usuarioRepository.findByID(id);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody CreateUserDTO updateUserDTO)
	{
		Optional<Usuario> usuarioExistente = usuarioRepository.findById(id);
		if(usuarioExistente.isEmpty())
		{
			return ResponseEntity.notFound().build();
		}
		userService.updateUser(id, updateUserDTO);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
}
