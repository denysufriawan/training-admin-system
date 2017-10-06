package com.example.tas.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="tr_user_attendance")
public class Attendance implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_user_attendance")
	private long idAttendance;
	
	@ManyToOne(optional=false)
    @JoinColumn(name="id_course_schedule",referencedColumnName="id_course_schedule")
    private Schedule courseSchedule;
	
	@ManyToOne(optional=false)
    @JoinColumn(name="id_user_course",referencedColumnName="id_user_course")
    private UserCourse userCourse;
	
	@ManyToOne(optional=false)
    @JoinColumn(name="id_absence",referencedColumnName="id_absence")
    private Absence absence;
	
	@Transient
	public List<String> idAttendanceInput;
	
	@Transient
	public List<String> idAbsenceInput;

	public long getIdAttendance() {
		return idAttendance;
	}

	public void setIdAttendance(long idAttendance) {
		this.idAttendance = idAttendance;
	}

	public Schedule getCourseSchedule() {
		return courseSchedule;
	}

	public void setCourseSchedule(Schedule courseSchedule) {
		this.courseSchedule = courseSchedule;
	}

	public UserCourse getUserCourse() {
		return userCourse;
	}

	public void setUserCourse(UserCourse userCourse) {
		this.userCourse = userCourse;
	}

	public Absence getAbsence() {
		return absence;
	}

	public void setAbsence(Absence absence) {
		this.absence = absence;
	}
	
	
}
