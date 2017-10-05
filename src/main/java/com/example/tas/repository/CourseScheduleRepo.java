package com.example.tas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.tas.model.CourseSchedule;

public interface CourseScheduleRepo extends JpaRepository<CourseSchedule, Long>,JpaSpecificationExecutor<CourseSchedule> {

}