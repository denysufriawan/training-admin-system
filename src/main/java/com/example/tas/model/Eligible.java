package com.example.tas.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="tr_user_period")
public class Eligible implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id_user_period")
	private long idUserPeriod;
	
	
	@Column(name = "id_period")
	private long idPeriod;
	
//	@Column(name = "id_user",nullable=false)
//	private long idUser;
	
	@ManyToOne(optional=false)
    @JoinColumn(name="id_user",referencedColumnName="id_user")
    private User eligibleUser;

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

//	public long getIdUser() {
//		return idUser;
//	}
//
//	public void setIdUser(long idUser) {
//		this.idUser = idUser;
//	}

	public User getEligibleUser() {
		return eligibleUser;
	}

	public void setEligibleUser(User eligibleUser) {
		this.eligibleUser = eligibleUser;
	}
	
}
