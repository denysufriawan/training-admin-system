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
@Table(name="tb_grade")
public class Grade implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_grade")
	private long idGrade;
	
	@Column(name = "grade_name")
	private String gradeName;
	
	@Column(name = "grade_name_short")
	private String gradeNameShort;
	
	@ManyToOne(optional=false)
    @JoinColumn(name="id_job_family",referencedColumnName="id_job_family")
    private JobFamily jobFamily;

	public long getIdGrade() {
		return idGrade;
	}

	public void setIdGrade(long idGrade) {
		this.idGrade = idGrade;
	}

	public String getGradeName() {
		return gradeName;
	}

	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
	}

	public String getGradeNameShort() {
		return gradeNameShort;
	}

	public void setGradeNameShort(String gradeNameShort) {
		this.gradeNameShort = gradeNameShort;
	}

	public JobFamily getJobFamily() {
		return jobFamily;
	}

	public void setJobFamily(JobFamily jobFamily) {
		this.jobFamily = jobFamily;
	}
	
}
