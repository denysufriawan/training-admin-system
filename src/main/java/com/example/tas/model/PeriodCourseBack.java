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
@Table(name="tr_period_course")
public class PeriodCourseBack implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_period_course")
	private long idPeriodCourse;
	
	@Column(name = "start_time")
	private String startTime;
	
	@Column(name = "end_time")
	private String endTime;
	
	@ManyToOne(optional=false)
    @JoinColumn(name="id_trainer_main",referencedColumnName="id_user")
    private User trainerMain;
	
	@ManyToOne(optional=false)
	@JoinColumn(name="id_course",referencedColumnName="id_course")
	private Course course;
	
	@ManyToOne(optional=false)
	@JoinColumn(name="id_period",referencedColumnName="id_period")
	private Period period;
	
	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public long getIdPeriodCourse() {
		return idPeriodCourse;
	}

	public void setIdPeriodCourse(long idPeriodCourse) {
		this.idPeriodCourse = idPeriodCourse;
	}

	public User getTrainerMain() {
		return trainerMain;
	}

	public void setTrainerMain(User trainerMain) {
		this.trainerMain = trainerMain;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public Period getPeriod() {
		return period;
	}

	public void setPeriod(Period period) {
		this.period = period;
	}
}
