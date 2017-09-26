package com.example.tas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tas.model.Grade;

public interface GradeRepo extends JpaRepository<Grade, Long>{

}
