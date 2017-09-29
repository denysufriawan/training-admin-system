package com.example.tas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.tas.model.Period;

public interface PeriodRepo extends JpaRepository<Period, Long>,JpaSpecificationExecutor<Period>{
	
}
