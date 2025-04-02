package medico.consultas.backend.model.rest.usuarios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import medico.consultas.backend.dto.CreateUserDTO;
import medico.consultas.backend.dto.LoginUserDto;
import medico.consultas.backend.dto.RecoveryJwtTokenDto;
import medico.consultas.backend.service.UsuarioService;
@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin("*")

public class UsuarioController {
	
	@Autowired
    private UsuarioService userService;
	
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
	
}
