package medico.consultas.backend.dto;

import java.util.List;

import medico.consultas.backend.model.Role;

public record RecoveryUserDto(Long id,String email,List<Role> roles) {

}
