package com.example.tas.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tb_job_family")
public class JobFamily implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_job_family")
	private long idJobFamily;
	
	@Column(name = "job_family_name")
	private String jobFamilyName;
	
	@Column(name = "job_family_name_short")
	private String jobFamilyNameShort;

	public long getIdJobFamily() {
		return idJobFamily;
	}

	public void setIdJobFamily(long idJobFamily) {
		this.idJobFamily = idJobFamily;
	}

	public String getJobFamilyName() {
		return jobFamilyName;
	}

	public void setJobFamilyName(String jobFamilyName) {
		this.jobFamilyName = jobFamilyName;
	}

	public String getJobFamilyNameShort() {
		return jobFamilyNameShort;
	}

	public void setJobFamilyNameShort(String jobFamilyNameShort) {
		this.jobFamilyNameShort = jobFamilyNameShort;
	}
	
}
