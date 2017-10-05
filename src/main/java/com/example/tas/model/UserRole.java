package com.example.tas.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="tr_user_role")
public class UserRole implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_user")
	private long idUser;
	
	@Column(name = "id_role")
	private long idRole;
	
	@ManyToOne(optional=false)
    @JoinColumn(name="id_user",referencedColumnName="id_user", insertable = false, updatable = false)
    private User userRole;

	public User getUserRole() {
		return userRole;
	}

	public void setUserRole(User userRole) {
		this.userRole = userRole;
	}

	public long getIdUser() {
		return idUser;
	}

	public void setIdUser(long idUser) {
		this.idUser = idUser;
	}

	public long getIdRole() {
		return idRole;
	}

	public void setIdRole(long idRole) {
		this.idRole = idRole;
	}
	
}
