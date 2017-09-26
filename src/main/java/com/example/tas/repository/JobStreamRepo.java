package com.example.tas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tas.model.JobStream;

public interface JobStreamRepo extends JpaRepository<JobStream, Long>{

}
