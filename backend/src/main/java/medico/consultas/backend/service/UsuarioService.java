package medico.consultas.backend.service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import medico.consultas.backend.config.SecurityConfiguration;
import medico.consultas.backend.dto.CreateUserDTO;
import medico.consultas.backend.dto.LoginUserDto;
import medico.consultas.backend.dto.RecoveryJwtTokenDto;
import medico.consultas.backend.model.Role;
import medico.consultas.backend.model.UserDetailsImpl;
import medico.consultas.backend.model.Usuario;
import medico.consultas.backend.model.repository.RoleRepository;
import medico.consultas.backend.model.repository.UsuarioRepository;
import medico.consultas.backend.model.repository.projections.UsersRoles;
import medico.consultas.backend.service.jwt.JwtTokenService;
import lombok.Builder;
@Service
public class UsuarioService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private UsuarioRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private SecurityConfiguration securityConfiguration;

    public RecoveryJwtTokenDto authenticateUser(LoginUserDto loginUserDto) {
    
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(loginUserDto.login(), loginUserDto.senha());

        Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return new RecoveryJwtTokenDto(jwtTokenService.generateToken(userDetails));
    }

    public void createUser(CreateUserDTO createUserDto) {
    	
        Optional<Usuario> existingUser = userRepository.findByLogin(createUserDto.login());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Usuário já cadastrado com esse login: " + createUserDto.login());
        }

        Role role = roleRepository.findByRole(createUserDto.role())
                                  .orElseGet(() -> {
                                      Role newRole = new Role();
                                      newRole.setName(createUserDto.role());
                                      return roleRepository.save(newRole);
                                  });

        Usuario newUser = new Usuario(
                createUserDto.login(),
                securityConfiguration.passwordEncoder().encode(createUserDto.senha()),
                List.of(role)
        );

        userRepository.save(newUser);
       
    }
    
    public void updateUser(Long userId, CreateUserDTO updatedUserDto) {
        Usuario user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + userId));

        Optional<Usuario> userWithSameLogin = userRepository.findByLogin(updatedUserDto.login());
        if (userWithSameLogin.isPresent() && !userWithSameLogin.get().getId().equals(userId)) {
            throw new RuntimeException("Já existe um usuário com esse login: " + updatedUserDto.login());
        }

        user.setLogin(updatedUserDto.login());
        user.setSenha(securityConfiguration.passwordEncoder().encode(updatedUserDto.senha()));

        Role role = roleRepository.findByRole(updatedUserDto.role())
                                  .orElseGet(() -> {
                                      Role newRole = new Role();
                                      newRole.setName(updatedUserDto.role());
                                      return roleRepository.save(newRole);
                                  });

        user.setRoles(List.of(role));

        userRepository.save(user);
    }


}