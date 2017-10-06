package com.example.tas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.tas.model.PeriodCourseBack;

public interface PeriodCourseBackRepo extends JpaRepository<PeriodCourseBack, Long>,JpaSpecificationExecutor<PeriodCourseBack>{

}
