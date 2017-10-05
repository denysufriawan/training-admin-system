package com.example.tas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.tas.model.UserCourse;

public interface UserCourseRepo extends JpaRepository<UserCourse, Long>,JpaSpecificationExecutor<UserCourse>{

}
