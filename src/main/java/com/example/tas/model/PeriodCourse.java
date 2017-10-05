package com.example.tas.model;

import java.io.Serializable;
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
    private Set<UserCourse> enrolledUser;

	@ManyToOne(optional=false)
    @JoinColumn(name="id_class",referencedColumnName="id_class")
    private Class classRoom;
	
	@ManyToOne(optional=false)
    @JoinColumn(name="id_trainer_main",referencedColumnName="id_user")
    private User trainerMain;
	
	@ManyToOne(optional=false)
    @JoinColumn(name="id_trainer_backup",referencedColumnName="id_user")
    private User trainerBackup;
	
	@ManyToOne(optional=false)
	@JoinColumn(name="id_course",referencedColumnName="id_course")
	private Course course;
	
	@ManyToOne(optional=false)
	@JoinColumn(name="id_period",referencedColumnName="id_period")
	private Period period;

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

	public User getTrainerBackup() {
		return trainerBackup;
	}

	public void setTrainerBackup(User trainerBackup) {
		this.trainerBackup = trainerBackup;
	}

	public Class getClassRoom() {
		return classRoom;
	}

	public void setClassRoom(Class classRoom) {
		this.classRoom = classRoom;
	}

	public Set<UserCourse> getEnrolledUser() {
		return enrolledUser;
	}

	public void setEnrolledUser(Set<UserCourse> enrolledUser) {
		this.enrolledUser = enrolledUser;
	}

	public long getIdPeriodCourse() {
		return idPeriodCourse;
	}

	public User getTrainerMain() {
		return trainerMain;
	}

	public void setTrainerMain(User trainerMain) {
		this.trainerMain = trainerMain;
	}

	public void setIdPeriodCourse(long idPeriodCourse) {
		this.idPeriodCourse = idPeriodCourse;
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
