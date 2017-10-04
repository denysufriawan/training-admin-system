package com.example.tas.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tb_course")
public class Course implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_course")
	private long idCourse;
	
	@Column(name = "course_name")
	private String courseName;
	
	@Column(name = "course_level")
	private String courseLevel;
	
	@Column(name = "course_group")
	private String courseGroup;

	public String getCourseLevel() {
		return courseLevel;
	}

	public void setCourseLevel(String courseLevel) {
		this.courseLevel = courseLevel;
	}

	public String getCourseGroup() {
		return courseGroup;
	}

	public void setCourseGroup(String courseGroup) {
		this.courseGroup = courseGroup;
	}

	public long getIdCourse() {
		return idCourse;
	}

	public void setIdCourse(long idCourse) {
		this.idCourse = idCourse;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

}
