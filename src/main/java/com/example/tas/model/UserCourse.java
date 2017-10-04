package com.example.tas.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tr_user_course")
public class UserCourse implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_user_course")
	private long idUserCourse;
	
	@Column(name = "user_status")
	private String userStatus;
	
	@Column(name = "enrolled_date")
	private String enrolledDate;
	
	@Column(name = "pass")
	private String pass;
	
	@Column(name = "id_course_type")
	private String idCourseType;
	
//	@ManyToOne(optional=false)
//    @JoinColumn(name="id_period_course",referencedColumnName="id_period_course")
//    private PeriodCourse periodCourse;
//	
//	@ManyToOne(optional=false)
//    @JoinColumn(name="id_user",referencedColumnName="id_user")
//    private User user;

//	public PeriodCourse getPeriodCourse() {
//		return periodCourse;
//	}
//
//	public void setPeriodCourse(PeriodCourse periodCourse) {
//		this.periodCourse = periodCourse;
//	}
//
//	public User getUser() {
//		return user;
//	}
//
//	public void setUser(User user) {
//		this.user = user;
//	}

	public long getIdUserCourse() {
		return idUserCourse;
	}

	public void setIdUserCourse(long idUserCourse) {
		this.idUserCourse = idUserCourse;
	}

	public String getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}

	public String getEnrolledDate() {
		return enrolledDate;
	}

	public void setEnrolledDate(String enrolledDate) {
		this.enrolledDate = enrolledDate;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	public String getIdCourseType() {
		return idCourseType;
	}

	public void setIdCourseType(String idCourseType) {
		this.idCourseType = idCourseType;
	}
	
}
