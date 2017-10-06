package com.example.tas.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="tr_user_period")
public class Eligible implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_user_period")
	private long idUserPeriod;
	
	
	@Column(name = "id_period")
	private long idPeriod;
	
	@Column(name = "id_user")
	private long idUser;
	
	@Transient
	public User user;

	public long getIdUserPeriod() {
		return idUserPeriod;
	}

	public void setIdUserPeriod(long idUserPeriod) {
		this.idUserPeriod = idUserPeriod;
	}

	public long getIdPeriod() {
		return idPeriod;
	}

	public void setIdPeriod(long idPeriod) {
		this.idPeriod = idPeriod;
	}

	public long getIdUser() {
		return idUser;
	}

	public void setIdUser(long idUser) {
		this.idUser = idUser;
	}
	
}
