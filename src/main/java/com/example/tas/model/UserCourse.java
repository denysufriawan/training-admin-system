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
@Table(name="tr_user_course")
public class UserCourse implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_user_course")
	private long idUserCourse;
	
	@Transient
	public List<String> idUserCourseInput;
	
	@Transient
	public List<String> passInput;
	
	@Column(name = "id_user")
	private long idUser;
	
	@Transient
	public User user;
	
	@Column(name = "user_status")
	private String userStatus;
	
	@Column(name = "enrolled_date")
	private String enrolledDate;
	
	@Column(name = "pass")
	private String pass;
	
	@ManyToOne(optional=false)
    @JoinColumn(name="id_period_course",referencedColumnName="id_period_course")
    private PeriodCourseBack periodCourse;
//	
//	@ManyToOne(optional=false)
//    @JoinColumn(name="id_user",referencedColumnName="id_user")
//    private User user;

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

	public long getIdUser() {
		return idUser;
	}

	public void setIdUser(long idUser) {
		this.idUser = idUser;
	}

	public PeriodCourseBack getPeriodCourse() {
		return periodCourse;
	}

	public void setPeriodCourse(PeriodCourseBack periodCourse) {
		this.periodCourse = periodCourse;
	}
	
}
