package com.example.tas.model;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="tr_period_course")
public class PeriodCourse extends Auditable<String> implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_period_course")
	private long idPeriodCourse;
	
	@Column(name = "id_course")
	private long idCourse;
	
	@Column(name = "id_period")
	private String idPeriod;
	

	
	@Column(name = "id_location")
	private long idLocation;
	
	@Column(name = "course_name")
	private String courseName;
	
	@Column(name = "capacity")
	private String capacity;

	@Column(name = "start_time")
	private String startTime;
	
	@Column(name = "end_time")
	private String endTime;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name="id_period_course",referencedColumnName="id_period_course")
    private List<UserCourse> enrolledUser;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="id_period_course",referencedColumnName="id_period_course")
    private Set<TrainerCourse> enrolledTrainer;
	
	@ManyToOne(optional=false)
    @JoinColumn(name="id_class",referencedColumnName="id_class")
    private Class classRoom;

	public Class getClassRoom() {
		return classRoom;
	}

	public void setClassRoom(Class classRoom) {
		this.classRoom = classRoom;
	}

	public List<UserCourse> getEnrolledUser() {
		return enrolledUser;
	}

	public void setEnrolledUser(List<UserCourse> enrolledUser) {
		this.enrolledUser = enrolledUser;
	}

	public Set<TrainerCourse> getEnrolledTrainer() {
		return enrolledTrainer;
	}

	public void setEnrolledTrainer(Set<TrainerCourse> enrolledTrainer) {
		this.enrolledTrainer = enrolledTrainer;
	}

	public long getIdPeriodCourse() {
		return idPeriodCourse;
	}

	public void setIdPeriodCourse(long idPeriodCourse) {
		this.idPeriodCourse = idPeriodCourse;
	}

	public long getIdCourse() {
		return idCourse;
	}

	public void setIdCourse(long idCourse) {
		this.idCourse = idCourse;
	}

	public String getIdPeriod() {
		return idPeriod;
	}

	public void setIdPeriod(String idPeriod) {
		this.idPeriod = idPeriod;
	}



	public long getIdLocation() {
		return idLocation;
	}

	public void setIdLocation(long idLocation) {
		this.idLocation = idLocation;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getCapacity() {
		return capacity;
	}

	public void setCapacity(String capacity) {
		this.capacity = capacity;
	}

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
	
}
