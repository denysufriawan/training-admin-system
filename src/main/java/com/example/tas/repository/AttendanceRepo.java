package com.example.tas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.tas.model.Attendance;

public interface AttendanceRepo extends JpaRepository<Attendance, Long>,JpaSpecificationExecutor<Attendance>{

}
