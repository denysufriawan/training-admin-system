package com.example.tas.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tb_course_type")
public class CourseType implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_course_type")
	private long idCourseType;
	
	@Column(name = "course_type")
	private String courseType;
	
	@Column(name = "course_level")
	private String courseLevel;
	
	@Column(name = "course_group")
	private String courseGroup;

	public long getIdCourseType() {
		return idCourseType;
	}

	public void setIdCourseType(long idCourseType) {
		this.idCourseType = idCourseType;
	}

	public String getCourseType() {
		return courseType;
	}

	public void setCourseType(String courseType) {
		this.courseType = courseType;
	}

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
	
}
