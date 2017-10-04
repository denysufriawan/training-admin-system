package com.example.tas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tas.model.JobFamily;
import com.example.tas.model.JobStream;

public interface JobStreamRepo extends JpaRepository<JobStream, Long>{

	List<JobStream> findByJobFamily(JobFamily jobFamily);
}
