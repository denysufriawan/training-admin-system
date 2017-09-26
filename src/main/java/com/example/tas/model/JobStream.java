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
@Table(name="tb_job_stream")
public class JobStream implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_job_stream")
	private long idJobStream;
	
	@Column(name = "job_stream_name")
	private String jobStreamName;
	
	@Column(name = "job_stream_name_short")
	private String jobStreamNameShort;
	
	@ManyToOne(optional=false)
    @JoinColumn(name="id_job_family",referencedColumnName="id_job_family")
    private JobFamily jobFamily;

	public long getIdJobStream() {
		return idJobStream;
	}

	public void setIdJobStream(long idJobStream) {
		this.idJobStream = idJobStream;
	}

	public String getJobStreamName() {
		return jobStreamName;
	}

	public void setJobStreamName(String jobStreamName) {
		this.jobStreamName = jobStreamName;
	}

	public String getJobStreamNameShort() {
		return jobStreamNameShort;
	}

	public void setJobStreamNameShort(String jobStreamNameShort) {
		this.jobStreamNameShort = jobStreamNameShort;
	}

	public JobFamily getJobFamily() {
		return jobFamily;
	}

	public void setJobFamily(JobFamily jobFamily) {
		this.jobFamily = jobFamily;
	}
	
}
