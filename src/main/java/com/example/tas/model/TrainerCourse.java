//package com.example.tas.model;
//
//import java.io.Serializable;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.persistence.Table;
//
//@Entity
//@Table(name="tr_trainer_course")
//public class TrainerCourse implements Serializable {
//
//	private static final long serialVersionUID = 1L;
//
//	@Id
//	@GeneratedValue(strategy=GenerationType.AUTO)
//	@Column(name = "id_trainer_course")
//	private long idTrainerCourse;
//
//
//	
//	@Column(name = "id_period_course")
//	private long idPeriodCourse;
//	
//	@Column(name = "trainer_status")
//	private String trainerStatus;
//	
//	@ManyToOne(optional=false)
//    @JoinColumn(name="id_user",referencedColumnName="id_user")
//    private User user;
//
//	public User getUser() {
//		return user;
//	}
//
//	public void setUser(User user) {
//		this.user = user;
//	}
//
//	public long getIdTrainerCourse() {
//		return idTrainerCourse;
//	}
//
//	public void setIdTrainerCourse(long idTrainerCourse) {
//		this.idTrainerCourse = idTrainerCourse;
//	}
//
//	public long getIdPeriodCourse() {
//		return idPeriodCourse;
//	}
//
//	public void setIdPeriodCourse(long idPeriodCourse) {
//		this.idPeriodCourse = idPeriodCourse;
//	}
//
//	public String getTrainerStatus() {
//		return trainerStatus;
//	}
//
//	public void setTrainerStatus(String trainerStatus) {
//		this.trainerStatus = trainerStatus;
//	}
//
//}
