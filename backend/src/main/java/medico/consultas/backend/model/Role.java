package medico.consultas.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import medico.consultas.backend.enums.RoleName;



@Entity
@Table(name="roles")
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Enumerated(EnumType.STRING)
	private RoleName role;
	
	public Role(Long id, RoleName name) {
		super();
		this.id = id;
		this.role = name;
	}
	
	public Role(RoleName name) {
		super();
		this.role = name;
	}

	public Role() {
		super();
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public RoleName getName() {
		return role;
	}
	public void setName(RoleName name) {
		this.role = name;
	}
	
	
}
