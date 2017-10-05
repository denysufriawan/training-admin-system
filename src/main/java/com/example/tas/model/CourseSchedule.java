package com.example.tas.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tr_course_schedule")
public class CourseSchedule implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_course_schedule")
	private long idCourseSchedule;
	
	@Column(name = "id_period_course")
	private long idPeriodCourse;
	
	@Column(name = "course_date")
	private String courseDate;

	public long getIdCourseSchedule() {
		return idCourseSchedule;
	}

	public void setIdCourseSchedule(long idCourseSchedule) {
		this.idCourseSchedule = idCourseSchedule;
	}

	public long getIdPeriodCourse() {
		return idPeriodCourse;
	}

	public void setIdPeriodCourse(long idPeriodCourse) {
		this.idPeriodCourse = idPeriodCourse;
	}

	public String getCourseDate() {
		return courseDate;
	}

	public void setCourseDate(String courseDate) {
		this.courseDate = courseDate;
	}

}
