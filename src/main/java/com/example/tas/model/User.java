package com.example.tas.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="tb_user")
public class User extends Auditable<String> implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_user")
	private long idUser;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "username")
	private String username;
	
	@JsonIgnore
	@Column(name = "password")
	private String password;
	
	@Column(name = "active")
	private String active;
	
	@ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name="tr_user_role",
            joinColumns=
            @JoinColumn(name="id_user", referencedColumnName="id_user"),
      inverseJoinColumns=
            @JoinColumn(name="id_role", referencedColumnName="id_role")
    )
	@OrderBy("role_level ASC")
    private List<Role> role;
	
	@ManyToOne(optional=false)
    @JoinColumn(name="id_grade",referencedColumnName="id_grade")
    private Grade grade;
	
	@ManyToOne(optional=false)
    @JoinColumn(name="id_job_stream",referencedColumnName="id_job_stream")
    private JobStream jobStream;

	public long getIdUser() {
		return idUser;
	}

	public void setIdUser(long idUser) {
		this.idUser = idUser;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}

	public List<Role> getRole() {
		return role;
	}

	public void setRole(List<Role> role) {
		this.role = role;
	}

	public Grade getGrade() {
		return grade;
	}

	public void setGrade(Grade grade) {
		this.grade = grade;
	}

	public JobStream getJobStream() {
		return jobStream;
	}

	public void setJobStream(JobStream jobStream) {
		this.jobStream = jobStream;
	}
	
}
