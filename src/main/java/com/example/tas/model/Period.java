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
import javax.persistence.Table;

@Entity
@Table(name="tb_period")
public class Period extends Auditable<String> implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_period")
	private long idPeriod;
	
	@Column(name = "period_name")
	private String periodName;
	
	@Column(name = "start_date")
	private String startDate;
	
	@Column(name = "end_date")
	private String endDate;
	
	@Column(name = "active")
	private String active;
	
	@ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name="tr_period_course",
            joinColumns=
            @JoinColumn(name="id_period", referencedColumnName="id_period"),
      inverseJoinColumns=
            @JoinColumn(name="id_course", referencedColumnName="id_course")
    )
	private List<Course> course;

	public long getIdPeriod() {
		return idPeriod;
	}

	public void setIdPeriod(long idPeriod) {
		this.idPeriod = idPeriod;
	}

	public String getPeriodName() {
		return periodName;
	}

	public void setPeriodName(String periodName) {
		this.periodName = periodName;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}

	public List<Course> getCourse() {
		return course;
	}

	public void setCourse(List<Course> course) {
		this.course = course;
	}
	
}
