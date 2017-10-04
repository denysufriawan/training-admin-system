package com.example.tas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.tas.model.PeriodCourse;

public interface PeriodCourseRepo extends JpaRepository<PeriodCourse, Long>,JpaSpecificationExecutor<PeriodCourse>{

}
