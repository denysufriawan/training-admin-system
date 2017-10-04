package com.example.tas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tas.model.Course;

public interface CourseRepo extends JpaRepository<Course, Long> {
	
	List<Course> findByCourseGroup(String group);
	Course findByIdCourseAndCourseGroup(Long id,String group);
}
