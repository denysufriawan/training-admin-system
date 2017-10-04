package com.example.tas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tas.model.Grade;
import com.example.tas.model.JobFamily;

public interface GradeRepo extends JpaRepository<Grade, Long>{

	List<Grade> findByJobFamily(JobFamily jobFamily);
}
