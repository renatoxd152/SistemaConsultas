package medico.consultas.backend.dto;

import medico.consultas.backend.enums.RoleName;

public record CreateUserDTO(String login, String senha,RoleName role) {

	public String login() {
		return login;
	}

	public String senha() {
		return senha;
	}

	public RoleName role() {
		return role;
	}
	
	
}
